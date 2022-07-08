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
        cacheMenu: (state) => state.menu.reduce((arr, item) => {
            if (item.meta?.keepAlive) {
                arr.push(item.name as never)
                return arr
            }
        }, [])
    },
    actions: {
        setAuthRouter(authRouter) {
            this.authRouter = authRouter
        }
    }
})


export default usePermissionStore