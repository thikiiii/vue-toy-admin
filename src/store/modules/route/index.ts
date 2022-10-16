import { defineStore } from 'pinia'
import { fixedRoute } from '@/router/fixedRoute'
import useAuthStore from '@/store/modules/auth'
import { authRouteList, createRootRoute } from '@/router/helpers'
import router from '@/router'
import RenderIcon from '@/components/Render/icon'
import RenderEllipsis from '@/components/Render/ellipsis'
import { AppRouteRecordRaw } from '#/router'
import { RouteRecordRaw } from 'vue-router'
import { Sort } from '@/enums/common'
import Settings from '@/settings'
import useTabBarStore from '@/store/modules/tabBar'


export const useRouteStore = defineStore('route', {
    state: (): Store.RouteStore => ({
        menus: [],
        routeAuthMode: Settings.routeAuthMode,
        hasInitAuthRoute: false
    }),
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
            const isAuth = (route: AppRouteRecordRaw) => route.meta?.ignoreRoleAuth ||
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

        // 创建菜单
        createMenu({ path, children, meta }: AppRouteRecordRaw): Store.MenuOption {
            return {
                key: path,
                label: meta?.title ? () => RenderEllipsis({ content: meta.title }) : '',
                icon: meta?.icon ? () => RenderIcon({ icon: meta.icon || '' }) : undefined,
                meta,
                children: children as Store.MenuOption['children']
            }
        },

        // 权限路由转菜单
        authRoutesToMenus(authRoutes: AppRouteRecordRaw[]): Store.MenuOption[] {
            const menus = authRoutes.map((route) => {
                if (route.meta?.hideMenu) return undefined
                if (!route.children) return this.createMenu(route)
                const menu = this.createMenu(route)
                menu.children = this.authRoutesToMenus(route.children)
                return menu
            })
            return menus.filter(menu => menu) as Store.MenuOption[]
        },

        // 设置菜单
        setMenu(authRoutes: AppRouteRecordRaw[]) {
            // 权限路由转菜单
            this.menus = this.authRoutesToMenus(authRoutes)
        },

        // 排序权限路由, 默认升序
        sortAuthRoutes(authRoutes: AppRouteRecordRaw[], type: Sort) {
            authRoutes.sort((a, b) => {
                if (type === Sort.Ascending) return Number(a.meta?.orderNo) - Number(b.meta?.orderNo)
                if (type === Sort.Descending) return Number(b.meta?.orderNo) - Number(a.meta?.orderNo)
                return 0
            })
        },

        // 初始化前端路由权限
        initFrontRouteAuth() {
            // 过滤权限路由
            const authRoutes = this.filterAuthRoutes()
            // 升序
            this.sortAuthRoutes(authRoutes, Sort.Ascending)
            // 包装路由
            const wrapperAuthRoutes = this.wrapperAuthRoutes(authRoutes)
            // 添加路由
            wrapperAuthRoutes.forEach(route => router.addRoute(route as RouteRecordRaw))
            // 设置菜单
            this.setMenu(authRoutes)
            // 设置固定标签
            useTabBarStore().setAffixTabs(authRoutes)
            this.hasInitAuthRoute = true
        },

        // 初始化服务端路由权限
        initServerRouteAuth() {

        }
    }
})