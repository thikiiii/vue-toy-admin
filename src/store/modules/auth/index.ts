import { defineStore } from 'pinia'
import { Store } from '#/store'
import { AuthCookie } from '@/storage/auth'
import { UserApi } from '@/services/api/user'
import router, { authRouteList } from '@/router'
import Settings from '@/settings'

// 鉴权
const useAuthStore = defineStore('auth', {
    state: (): Store.AuthStore => ({
        userinfo: null,
        loginLoading: false,
        token: AuthCookie.getToken() || null,
        roles: [],
        menu: [],
        permissions: [],
        authRoute: authRouteList,
        publicRoute: []
    }),
    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menu.reduce((arr, item) => {
            item.meta?.keepAlive && arr.push(item.name as never)
            return arr
        }, [])
    },
    actions: {
        setToken(token) {
            this.token = token
            AuthCookie.setToken(token)
        },
        removeToken() {
            this.token = null
            AuthCookie.removeToken()
        },
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
            this.setToken(token)
            await this.getUserinfo()
            const redirect = router.currentRoute.value.query.redirect
            await router.replace(redirect as string || Settings.homePath)
            this.loginLoading = false
            window.$message?.success('登录成功')
            return Promise.resolve()
        },
        // 获取用户信息
        async getUserinfo() {
            const { subCode, data, subMsg } = await UserApi.getUserinfo().catch(() => {
                this.loginLoading = false
                return Promise.reject()
            })
            if (subCode !== 200 || !data) {
                window.$message?.error(subMsg)
                this.loginLoading = false
                return Promise.reject()
            }
            this.roles = data.roles
            this.permissions = data.permissions
            this.userinfo = data.userinfo
            // this.filterMenusByRole()
        },
        // 初始化
        init() {
            AuthCookie.removeToken()
            this.token = null
            this.userinfo = null
            this.roles = []
            this.permissions = []
            this.menu = []
            this.loginLoading = false
            this.authRoute = authRouteList
            this.publicRoute = []
        },
        // 退出登录
        async signOut() {
            await UserApi.signOut().finally(() => {
                this.init()
                window.$message?.success('退出登录成功!')
                router.currentRoute.value.path !== '/login' && router.push({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.value.path
                    }
                })
            })
        },
        filterMenusByRole() {
            this.authRoute.forEach(item => {
                router.addRoute(item)
            })
        }
    }
})


export default useAuthStore