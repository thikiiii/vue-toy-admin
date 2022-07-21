import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { fixedRoute } from '@/router/fixedRoute'
import useAuthStore from '@/store/modules/auth'
import { authRouteList, createRootRoute } from '@/router/helpers'
import router from '@/router'
import RenderIcon from '@/components/Render/icon'
import RenderEllipsis from '@/components/Render/ellipsis'


export const useRouteStore = defineStore('route', {
    state: (): Store.RouteStore => ({
        menus: []
    }),

    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menus.reduce((arr, item) => {
            item.meta?.keepAlive && arr.push(item.key as never)
            return arr
        }, [])
    },
    actions: {
        // 初始化路由
        initRouteStore() {
            this.$reset()
            this.resetRoutes()
        },

        // 重置路由,只保留固定路由
        resetRoutes() {
            const routes = router.getRoutes()
            routes.forEach(route => route.name && router.removeRoute(route.name))
            fixedRoute.forEach(route => router.addRoute(route))
        },

        // 过滤权限路由
        filterAuthRoutes(): RouteRecordRaw[] {
            const authStore = useAuthStore()
            // 是否有权限
            const isAuth = (route: RouteRecordRaw) => route.meta?.ignoreAuth ||
                (
                    Boolean(route.meta?.roles?.length) &&
                    route.meta?.roles?.some(role => authStore.roles.includes(role))
                )

            // 处理目录
            const handleDirectory = (route: RouteRecordRaw): RouteRecordRaw | undefined => {
                const directory: RouteRecordRaw = { ...route, children: [] }

                directory.children = route.children?.filter(route => {
                    if (route.children) return handleDirectory(route)

                    return isAuth(route)
                })

                if (directory.children?.length) return directory
            }
            // 将过滤好的权限路由返回
            return authRouteList.reduce<RouteRecordRaw[]>((authRoutes, route) => {
                if (!Boolean(route.children?.length) && isAuth(route)) {
                    authRoutes.push(route)
                    return authRoutes
                }
                const directory = handleDirectory(route)
                directory && authRoutes.push(directory)
                return authRoutes
            }, [])
        },

        // 包装权限路由,一级路由转二级路由
        wrapperAuthRoutes(authRoutes: RouteRecordRaw[]) {
            return authRoutes.map((route) => {
                if (route.children) return route
                const root = createRootRoute()
                root.children?.push(route)
                return root
            }, [])
        },

        // 权限路由转菜单
        authRoutesToMenus(authRoutes: RouteRecordRaw[]): Store.MenuOption[] {
            // 创建菜单
            const createMenu = ({ path, children, meta }: RouteRecordRaw): Store.MenuOption => ({
                key: path,
                label: () => RenderEllipsis({ content: meta?.title }),
                icon: () => RenderIcon({ icon: meta?.icon || '' }),
                meta: meta,
                children: children as Store.MenuOption['children']
            })

            return authRoutes.map(route => {
                if (!route.children) return createMenu(route)
                const menu = createMenu(route)
                menu.children = this.authRoutesToMenus(route.children)
                return menu
            })
        },

        // 添加权限路由
        addAuthRoues() {
            // 过滤权限路由
            const authRoutes = this.filterAuthRoutes()
            // 包装路由
            const wrapperAuthRoutes = this.wrapperAuthRoutes(authRoutes)
            // 添加路由
            wrapperAuthRoutes.forEach(route => {
                router.addRoute(route)
            })
            // 权限路由转菜单   TODO: 递归 TS 类型错误
            this.menus = this.authRoutesToMenus(authRoutes) as never
        }
    }
})