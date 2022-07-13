import { defineStore } from 'pinia'
import { Store } from '#/store'
import { AuthCookie } from '@/storage/auth'
import { UserApi } from '@/services/api/user'
import router from '@/router'

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
        }, [ 'About' ])
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
            this.token = token
            AuthCookie.setToken(token)
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
        },
        // 退出登录
        async signOut() {
            await UserApi.signOut().finally(() => {
                this.init()
                window.$message?.success('退出登录成功')
                console.log(router.currentRoute)
                router.currentRoute.value.path !== '/login' && router.push({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.value.path
                    }
                })
            })
        }
    }
})


export default useAuthStore