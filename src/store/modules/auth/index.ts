import { defineStore } from 'pinia'
import { Store } from '#/store'
import { AuthCookie } from '@/storage/auth'
import { UserApi } from '@/services/api/user'
import router, { authRouteList } from '@/router'
import Settings from '@/settings'
import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layout/index'


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
            console.log(this.filterAuthRoute(authRouteList))
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
        filterAuthRoute(authRouteList) {
            return authRouteList.map(route => {
                const roles = route.meta?.roles
                const isAuth = Boolean(roles?.length) && roles?.some(role => this.roles.includes(role))
                if (!isAuth) return
                
                // isSelf：是否本身， 无 children 自己就是菜单
                const isSelf = !Boolean(route.children?.length)
                console.log(route.children)
                if (isSelf) {
                    const rootRoute: RouteRecordRaw = {
                        path: '/',
                        name: 'root',
                        component: Layout,
                        children: [ route ]
                    }
                    return rootRoute
                }
                // 有 children 自己就是目录
                return this.filterAuthRoute(route.children)
            })
        },
        
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