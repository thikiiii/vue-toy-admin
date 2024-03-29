import { defineStore } from 'pinia'
import { AuthCookie } from '@/storage/auth'
import { UserApi } from '@/services/api/user'
import router from '@/router'
import { LoginMethod } from '@/enums/common'
import { useRouteStore } from '@/store/modules/route'
import { RouteAuthModeEnum } from '@/enums/auth'
import { Settings } from '@/settings'
import { discreteApi } from '@/plugIn/naiveUi/discreteApi'

// 鉴权
const useAuthStore = defineStore('auth', {
    state: (): Store.AuthStore => ({
        userinfo: null,
        loginLoading: false,
        token: AuthCookie.getToken() || null,
        roles: [],
        permissions: [],
        signOutLoading: false
    }),
    getters: {
        // 是否登录
        isLogin: state => Boolean(state.token),

        // 是否有鉴权
        isAuth: state => Boolean(state.roles.length) && Boolean(state.userinfo)
    },
    actions: {
        // 密码登录
        async passwordLogin(form: UserApiRequest.PasswordLogin) {
            this.loginLoading = true
            const { subCode, token, subMsg } = await UserApi.passwordLogin(form).catch(() => {
                this.loginLoading = false
                return Promise.reject()
            })

            if (subCode !== 200 || !token) {
                discreteApi.message.error(subMsg)
                this.loginLoading = false
                return Promise.reject()
            }
            this.setToken(token)
            return Promise.resolve()
        },

        // 获取用户信息
        async getUserinfo() {
            const { subCode, subMsg, result } = await UserApi.getUserinfo().catch(() => {
                this.initUserStore()
                return Promise.reject()
            })
            if (subCode !== 200 || !result) {
                discreteApi.message.error(subMsg)
                this.initUserStore()
                return Promise.reject()
            }
            this.roles = result.roles
            this.permissions = result.permissions
            this.userinfo = result.userinfo
        },

        // 处理登录
        async handleLogin(
            loginMethod: LoginMethod,
            form: UserApiRequest.PasswordLogin
        ) {
            switch (loginMethod) {
            // 密码登录
                case LoginMethod.Password:
                    await this.passwordLogin(form)
                    break
            }
            await this.getUserinfo()

            const routeStore = useRouteStore()

            switch (routeStore.routeAuthMode) {
                case RouteAuthModeEnum.FRONT:
                    routeStore.initFrontRouteAuth()
                    break
                case RouteAuthModeEnum.SERVER:
                    await routeStore.initServerRouteAuth()
                    break
            }

            const redirect = router.currentRoute.value.query.redirect
            await router.replace(redirect as string || Settings.homePath)
            discreteApi.notification.success({
                title: '登录成功',
                content: `欢迎回来，${this.userinfo?.username}！`
            })
            this.loginLoading = false
        },

        // 退出登录
        async signOut() {
            const { subCode, subMsg } = await UserApi.signOut()
            if (subCode !== 200) discreteApi.message.error(subMsg)
            
            await this.handleSignOut()
        },

        async handleSignOut() {
            this.signOutLoading = true
            await router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.value.path }
            })
            const routeStore = useRouteStore()
            this.initUserStore()
            routeStore.initRouteStore()
            discreteApi.message.success('退出登录成功!')
            this.signOutLoading = false
        },

        // 初始化
        initUserStore() {
            this.removeToken()
            this.$reset()
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
