import { defineStore } from 'pinia'
import useAuthStore from '@/store/modules/auth'
import { RouterHelpers } from '@/router/helpers'
import router from '@/router'
import { Sort } from '@/enums/common'
import { UserApi } from '@/services/api/user'
import { matchUrl } from '@/utils/regularCheck'
import { Settings } from '@/settings'
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
        },

        // 获取用户路由
        async getRoutes(): Promise<UserService.Response.UserRoutes[]> {
            const { subCode, subMsg, data } = await UserApi.getRoutes().catch(() => {
                this.initRouteStore()
                return Promise.reject()
            })

            if (subCode !== 200 || !data) {
                window.$message?.error(subMsg)
                this.initRouteStore()
                return Promise.reject()
            }

            return data
        },

        // 重定向到首页
        redirectToHomepage() {
            router.push(Settings.homePath)
        },

        // 处理点击菜单
        handleClickMenu(path: string) {
            // 跳转外链
            if (matchUrl.test(path)) return RouterHelpers.openTheLink(path)
            router.push(path)
        },
        // 过滤本地权限路由
        filterAuthRoutes(routeList: Route.RouteRecordRaw[]): Route.RouteRecordRaw[] {
            const authStore = useAuthStore()

            // 是否有需要权限
            const isRequiresAuth = (route: Route.RouteRecordRaw) => Boolean(route.meta?.roles?.length)

            // 有权限
            const hasAuth = (route: Route.RouteRecordRaw) => route.meta?.roles?.some(role => authStore.roles.includes(role))

            // 将过滤好的权限路由返回
            return routeList.reduce<Route.RouteRecordRaw[]>((authRoutes, route) => {
                // PUSH 权限路由
                const pushAuthRoute = () => {
                    authRoutes.push(route)
                    if (route.children?.length) route.children = this.filterAuthRoutes(route.children)
                    return authRoutes
                }

                // 需要权限
                if (isRequiresAuth(route)) {
                    if (!hasAuth(route)) return authRoutes
                    return pushAuthRoute()
                }

                // 不需要权限直接 PUSH
                return pushAuthRoute()
            }, [])
        },

        // 初始化前端路由权限
        initFrontRouteAuth() {
            // 过滤本地权限路由
            const routes = RouterHelpers.removeEmptyLayout(this.filterAuthRoutes(RouterHelpers.routeList))
            // 升序
            RouterHelpers.sortRoutes(routes, Sort.Ascending)
            // 自定义路由转 Vue 路由，并包装路由后添加到 router 中
            RouterHelpers
                .transformCustomRoutesToVueRoutes(RouterHelpers.useLayoutWrapperSingleViewRoute(routes))
                .forEach(route => router.addRoute(route))
            console.log(router.getRoutes())
            // 设置菜单
            // @ts-ignore
            this.menus = RouterHelpers.transformRoutesToMenus(routes)
            useTabBarStore().initTabBar(routes)
            this.hasInitAuthRoute = true
        },

        // 初始化服务端路由权限
        async initServerRouteAuth() {
            // 获取路由
            const routes = await this.getRoutes().catch(() => Promise.reject()) as Route.RouteRecordRaw[]
            RouterHelpers
                .transformCustomRoutesToVueRoutes(RouterHelpers.useLayoutWrapperSingleViewRoute(routes))
                .forEach(route => router.addRoute(route))
            // 设置菜单
            this.menus = RouterHelpers.transformRoutesToMenus(routes)
            useTabBarStore().initTabBar(routes)
            this.hasInitAuthRoute = true
        }
    }
})