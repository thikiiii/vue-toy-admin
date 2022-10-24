import {defineStore} from 'pinia'
import {AuthCookie} from '@/storage/auth'
import {UserApi} from '@/services/api/user'
import router from '@/router'
import Settings from '@/settings'
import {LoginMethod} from "@/enums/common";
import {useRouteStore} from "@/store/modules/route";
import {RouteAuthMode} from "@/enums/auth";

// 鉴权
const useAuthStore = defineStore('auth', {
    state: (): Store.AuthStore => ({
        userinfo: null,
        loginLoading: false,
        token: AuthCookie.getToken() || null,
        roles: [],
        permissions: []
    }),
    getters: {
        // 是否登录
        isLogin: (state) => Boolean(state.token),

        // 是否有鉴权
        isAuth: (state) => Boolean(state.roles.length) && Boolean(state.userinfo)
    },
    actions: {
        // 密码登录
        async passwordLogin(form: UserService.Request.PasswordLogin) {
            this.loginLoading = true
            const {subCode, subMsg, token} = await UserApi.passwordLogin(form).catch(() => {
                this.loginLoading = false
                return Promise.reject()
            })

            if (subCode !== 200 || !token) {
                window.$message?.error(subMsg)
                this.loginLoading = false
                return Promise.reject()
            }

            this.setToken(token)
            return Promise.resolve()
        },

        // 获取用户信息
        async getUserinfo() {
            const {subCode, data, subMsg} = await UserApi.getUserinfo().catch(() => {
                this.initUserStore()
                return Promise.reject()
            })

            if (subCode !== 200 || !data) {
                window.$message?.error(subMsg)
                this.initUserStore()
                return Promise.reject()
            }

            this.roles = data.roles;
            this.permissions = data.permissions
            this.userinfo = data.userinfo
        },

        // 处理登录
        async handleLogin(loginMethod: LoginMethod, form: UserService.Request.PasswordLogin) {
            switch (loginMethod) {
                // 密码登录
                case LoginMethod.Password:
                    await this.passwordLogin(form)
                    break
            }
            await this.getUserinfo()

            const routeStore = useRouteStore();

            switch (routeStore.routeAuthMode) {
                case RouteAuthMode.FRONT:
                    routeStore.initFrontRouteAuth()
                    break
                case RouteAuthMode.SERVER:
                    break
            }

            window.$notification?.success({
                title: '登录成功',
                content: `欢迎回来，${this.userinfo?.username}！`
            })
            this.loginLoading = false

            const redirect = router.currentRoute.value.query.redirect
            await router.replace(redirect as string || Settings.homePath)
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