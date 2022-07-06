import { defineStore } from 'pinia'
import { Store } from '/#/store'
import { UserApi } from '@/services/api/user'
import { StoreStorage } from '@/storage/store'

export const useUserStore = defineStore('user', {
    state: (): Store.UserStore => ({
        token: StoreStorage.getToken() || null,
        userinfo: null,
        loginLoading: false,
        menu: []
    }),
    getters: {
        // 缓存菜单
        cacheMenu: (state) => state.menu.map(item => item.meta?.keepAlive ? item.name : undefined)
    },
    actions: {
        // 密码登录
        async passwordLogin(form: Api.User.PasswordLoginRequset) {
            const { subCode, subMsg, token } = await UserApi.passwordLogin(form)
            if (subCode !== 200) return window.$message?.error(subMsg)
            StoreStorage.setToken(token)
            this.token = token
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