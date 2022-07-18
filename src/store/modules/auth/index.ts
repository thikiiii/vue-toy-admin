import { defineStore } from 'pinia'
import { AuthCookie } from '@/storage/auth'
import { UserApi } from '@/services/api/user'
import router, { authRouteList } from '@/router'
import Settings from '@/settings'
import { RouteRecordRaw } from 'vue-router'
import { createDirectory } from '@/router/fixedRoute'

// 鉴权
const useAuthStore = defineStore('auth', {
    state: (): Store.AuthStore => ({
        userinfo: null,
        loginLoading: false,
        token: AuthCookie.getToken() || null,
        roles: [],
        menu: [],
        permissions: []
    }),
    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menu.reduce((arr, item) => {
            item.meta?.keepAlive && arr.push(item.name as never)
            return arr
        }, []),

        // 是否登录
        isLogin(state) {
            return Boolean(state.token)
        },

        // 是否有鉴权
        hasAuth(state) {
            return Boolean(state.roles.length) && Boolean(state.userinfo)
        }
    },
    actions: {
        // 密码登录
        async passwordLogin(form: UserService.Request.PasswordLogin) {
            const { subCode, subMsg, token } = await UserApi.passwordLogin(form).catch(() => {
                this.loginLoading = false
                return Promise.reject()
            })

            if (subCode !== 200 || !token) {
                window.$message?.error(subMsg)
                this.loginLoading = false
                return Promise.reject()
            }

            // 登录成功后的操作
            await this.loginSuccessAction(token)
            return Promise.resolve()
        },

        // 登录成功后的操作
        async loginSuccessAction(token) {
            this.setToken(token)
            await this.getUserinfo()
            const redirect = router.currentRoute.value.query.redirect
            await router.replace(redirect as string || Settings.homePath)
            this.loginLoading = false
            window.$message?.success('登录成功')
        },

        // 获取用户信息
        async getUserinfo() {
            const { subCode, data, subMsg } = await UserApi.getUserinfo().catch(() => {
                this.initUserStore()
                return Promise.reject()
            })
            if (subCode !== 200 || !data) {
                window.$message?.error(subMsg)
                this.initUserStore()
                return Promise.reject()
            }
            this.roles = data.roles
            this.permissions = data.permissions
            this.userinfo = data.userinfo
            this.filterAuthRoute(authRouteList).forEach(route => {
                router.addRoute(route as RouteRecordRaw)
            })
        },


        // 退出登录
        async signOut() {
            await UserApi.signOut().finally(() => {
                this.initUserStore()
                window.$message?.success('退出登录成功!')
                router.currentRoute.value.path !== '/login' && router.push({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.value.path
                    }
                })
            })
        },

        // 过滤权限路由
        filterAuthRoute(authRouteList: RouteRecordRaw[]) {
            // 是否有权限
            const isAuth = (route: RouteRecordRaw) => route.meta?.ignoreAuth ||
                (
                    Boolean(route.meta?.roles?.length) &&
                    route.meta?.roles?.some(role => this.roles.includes(role))
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
                if (self) return self
                return handleDirectory(route)
            }).filter((route) => Boolean(route))
        },

        // // 生成菜单
        // createMenu(authRouteList: RouteRecordRaw[]): MenuOption[] {
        //     // const menu
        // },

        // 初始化
        initUserStore() {
            this.removeToken()
            this.userinfo = null
            this.roles = []
            this.permissions = []
            this.menu = []
            this.loginLoading = false
        },

        setToken(token) {
            this.token = token
            AuthCookie.setToken(token)
        },

        removeToken() {
            this.token = null
            AuthCookie.removeToken()
        }
    }
})


export default useAuthStore