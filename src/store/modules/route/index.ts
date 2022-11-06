import { defineStore } from 'pinia'
import useAuthStore from '@/store/modules/auth'
import { RouterHelpers } from '@/router/helpers'
import router from '@/router'
import { Sort } from '@/enums/common'
import Settings from '@/settings'
import useTabBarStore from '@/store/modules/tabBar'
import { UserApi } from '@/services/api/user'

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


        // 排序权限路由, 默认升序
        sortAuthRoutes(authRoutes: Route.RouteRecordRaw[], type: Sort) {
            authRoutes.sort((a, b) => {
                if (type === Sort.Ascending) return Number(a.meta?.orderNo) - Number(b.meta?.orderNo)
                if (type === Sort.Descending) return Number(b.meta?.orderNo) - Number(a.meta?.orderNo)
                return 0
            })
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
            // 设置菜单
            this.menus = RouterHelpers.transformRoutesToMenus(routes)
            // 设置固定标签
            useTabBarStore().setAffixTabs(routes)
            this.hasInitAuthRoute = true
        },

        // 初始化服务端路由权限
        async initServerRouteAuth() {
            // 获取路由
            await this.getRoutes()
        }
    }
})