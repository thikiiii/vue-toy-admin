import { defineStore } from 'pinia'
import { Store } from '/#/store'


export const useUserStore = defineStore('user', {
    state: (): Store.UserStore => ({
        token: '',
        userinfo: null
    }),
    actions: {
        async passwordLogin() {

        }
    }
})