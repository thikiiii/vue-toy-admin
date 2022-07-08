import { defineStore } from 'pinia'
import { Store } from '#/store'
import { UserApi } from '@/services/api/user'
import { UserStorage } from '@/storage/user'

export const useUserStore = defineStore('user', {
    state: (): Store.UserStore => ({
        token: UserStorage.getToken() || null,
        userinfo: null,
        loginLoading: false
    }),
    actions: {
        // 密码登录
        async passwordLogin(form: UserService.Request.PasswordLogin) {
            const { subCode, subMsg, token } = await UserApi.passwordLogin(form)
            if (subCode !== 200) {
                window.$message?.error(subMsg)
                return Promise.reject()
            }
            this.token = token
            UserStorage.setToken(token)
            return Promise.resolve()
        },
        // 获取用户信息
        async getUserinfo() {
            const { subCode, data, subMsg } = await UserApi.getUserinfo()
            if (subCode !== 200 || !data) return window.$message?.error(subMsg)
            this.userinfo = data
        },
        // 获取路由
        async getRouter() {

        }
    }
})