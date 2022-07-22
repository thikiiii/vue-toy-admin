import { defineStore } from 'pinia'
import { fixedRoute } from '@/router/fixedRoute'
import useAuthStore from '@/store/modules/auth'
import { authRouteList, createRootRoute } from '@/router/helpers'
import router from '@/router'
import RenderIcon from '@/components/Render/icon'
import RenderEllipsis from '@/components/Render/ellipsis'
import { AppRouteRecordRaw } from '#/router'
import { RouteRecordRaw } from 'vue-router'


export const useRouteStore = defineStore('route', {
    state: (): Store.RouteStore => ({
        menus: []
    }),

    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menus.reduce<string[]>((caches, item) => {
            item.meta?.keepAlive && item.name && caches.push(item.name)
            return caches
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
            fixedRoute.forEach(route => router.addRoute(route as RouteRecordRaw))
        },

        // 过滤权限路由
        filterAuthRoutes(): AppRouteRecordRaw[] {
            const authStore = useAuthStore()
            // 是否有权限
            const isAuth = (route: AppRouteRecordRaw) => route.meta?.ignoreAuth ||
                (
                    Boolean(route.meta?.roles?.length) &&
                    route.meta?.roles?.some(role => authStore.roles.includes(role))
                )

            // 处理目录
            const handleDirectory = (route: AppRouteRecordRaw): AppRouteRecordRaw | undefined => {
                const directory: AppRouteRecordRaw = { ...route, children: [] }

                directory.children = route.children?.filter(route => {
                    if (route.children) return handleDirectory(route)
                    return isAuth(route)
                })

                if (directory.children?.length) return directory
            }
            // 将过滤好的权限路由返回
            return authRouteList.reduce<AppRouteRecordRaw[]>((authRoutes, route) => {
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
        wrapperAuthRoutes(authRoutes: AppRouteRecordRaw[]) {
            return authRoutes.map((route) => {
                if (route.children) return route
                const root = createRootRoute()
                root.children?.push(route)
                return root
            }, [])
        },

        // 权限路由转菜单
        authRoutesToMenus(authRoutes: AppRouteRecordRaw[]): Store.MenuOption[] {
            // 创建菜单
            const createMenu = ({ path, children, meta, name }: AppRouteRecordRaw): Store.MenuOption => ({
                key: path,
                label: () => RenderEllipsis({ content: meta?.title }),
                icon: () => RenderIcon({ icon: meta?.icon || '' }),
                meta,
                name: name as string,
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
            console.log(authRoutes)
            // 包装路由
            const wrapperAuthRoutes = this.wrapperAuthRoutes(authRoutes)
            // 添加路由
            wrapperAuthRoutes.forEach(route => router.addRoute(route as RouteRecordRaw))
            // 权限路由转菜单
            this.menus = this.authRoutesToMenus(authRoutes)
        },

        // 获取面包屑
        getBreadcrumb(routePath: string): Store.MenuOption[] {
            const menus: Store.MenuOption[] = []
            // 找与路由路径配置的菜单
            const findMatchesMenus = (menus): Store.MenuOption => {
                return menus.find(menu => {
                    if (menu.key === routePath) return true
                    if (menu.children) return findMatchesMenus(menu.children)
                })
            }
            const menu = findMatchesMenus(this.menus)
            if (!menu) return []
            menus.push(menu)
            // 扁平化菜单
            const flatMenus = (menuChildren: Store.MenuOption[]) => {
                menuChildren.forEach(menu => {
                    menus.push(menu)
                    if (menu.children) flatMenus(menu.children)
                })
            }
            menu.children && flatMenus(menu.children)
            return menus
        }
    }
})