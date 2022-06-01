import { defineStore } from 'pinia'
import { UserStore } from '@/store/modules/user/type'


export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        token: '',
        userinfo: null
    }),
    actions: {}
})