import { defineStore } from 'pinia'
import { Store } from '/#/store'

const usePermissionStore = defineStore('router', {
    state: (): Store.PermissionStore => ({
        authRouter: [],
        publicRouter: []
    }),
    actions: {
        setAuthRouter(authRouter) {
            this.authRouter = authRouter
        }
    }
})


export default usePermissionStore