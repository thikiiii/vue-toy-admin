import { defineStore } from 'pinia'
import { Store } from '/#/store'
import { UserApi } from '@/services/api/user'


export const useUserStore = defineStore('user', {
    state: (): Store.UserStore => ({
        token: '',
        userinfo: null,
        loginLoading: false
    }),
    actions: {
        // 密码登录
        async passwordLogin(form: Api.User.PasswordLoginRequset) {
            const passwordLoginResponse = await UserApi.passwordLogin(form)
            console.log(passwordLoginResponse)
        },
        async getUserinfo() {
            const { data } = await UserApi.getUserinfo()
            if (data) {
                this.userinfo = data
            }
        }
    }
})