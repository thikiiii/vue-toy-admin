import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { fixedRoute } from '@/router/fixedRoute'
import useAuthStore from '@/store/modules/auth'
import { authRouteList, createDirectory } from '@/router/helpers'
import router from '@/router'

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

            // 处理本身
            const hanldeSelf = (route: RouteRecordRaw) => {
                if (!Boolean(route.children?.length) && isAuth(route)) {
                    // 创建目录
                    const rootRoute = createDirectory()
                    rootRoute.children?.push(route)
                    return rootRoute
                }
            }

            // 处理目录
            const handleDirectory = (route: RouteRecordRaw) => {
                const directory: RouteRecordRaw = { ...route, children: [] }

                directory.children = route.children?.filter(route => {
                    if (route.children) return handleDirectory(route)

                    return isAuth(route)
                })

                if (directory.children?.length) return directory
            }

            return authRouteList.map(route => {
                const self = hanldeSelf(route)
                return self ? self : handleDirectory(route)
            }).filter((route) => Boolean(route)) as RouteRecordRaw[]
        },

        // 添加权限路由
        addAuthRoues() {
            this.filterAuthRoutes().forEach(route => {
                router.addRoute(route)
            })
        }
    }
})