import { defineStore } from 'pinia'
import { Store } from '#/store'
import { UserApi } from '@/services/api/user'
import { UserStorage } from '@/storage/user'
import useAuthStore from '@/store/modules/auth'

export const useUserStore = defineStore('user', {
    state: (): Store.UserStore => ({
        userinfo: null,
        loginLoading: false
    }),
    actions: {
        // 密码登录
        async passwordLogin(form: UserService.Request.PasswordLogin) {
            try {
                const { subCode, subMsg, token } = await UserApi.passwordLogin(form)
                if (subCode !== 200) {
                    window.$message?.error(subMsg)
                    return Promise.reject()
                }
                useAuthStore().setToken(token)
                UserStorage.setToken(token)
                return Promise.resolve()
            } catch (e) {
                this.loginLoading = false
            }
        },
        // 获取用户信息
        async getUserinfo() {
            const { subCode, data, subMsg } = await UserApi.getUserinfo()
            if (subCode !== 200 || !data) {
                window.$message?.error(subMsg)
                this.loginLoading = false
                return Promise.reject()
            }
            this.userinfo = data.userinfo
        },
        // 获取路由
        async getRouter() {

        }
    }
})