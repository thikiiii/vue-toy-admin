import { defineStore } from 'pinia'
import { Store } from '#/store'

const usePermissionStore = defineStore('router', {
    state: (): Store.PermissionStore => ({
        authRouter: [],
        publicRouter: [],
        menu: []
    }),
    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menu.map(item => item.meta?.keepAlive ? item.name : undefined)
    },
    actions: {
        setAuthRouter(authRouter) {
            this.authRouter = authRouter
        }
    }
})


export default usePermissionStore