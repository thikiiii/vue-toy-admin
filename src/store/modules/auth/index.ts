import { defineStore } from 'pinia'
import { Store } from '#/store'
import { UserStorage } from '@/storage/user'

// 鉴权
const useAuthStore = defineStore('auth', {
    state: (): Store.AuthStore => ({
        token: UserStorage.getToken() || null,
        authRouter: [],
        publicRouter: [],
        roles: [],
        menu: []
    }),
    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menu.reduce((arr, item) => {
            item.meta?.keepAlive && arr.push(item.name as never)
            return arr
        }, [ 'About' ])
    },
    actions: {
        setAuthRouter(authRouter) {
            this.authRouter = authRouter
        },
        // 设置token
        setToken(token: string) {
            this.token = token
        },
        // 清楚 token
        clearToken() {
            this.token = null
        }
    }
})


export default useAuthStore