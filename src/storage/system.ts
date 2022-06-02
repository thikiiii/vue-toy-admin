import store from 'store'

// 系统
export class SystemStorage {
    // 是否自动登录
    public static readonly autoLogin = 'AUTO_LOGIN'

    // 设置自动登录
    static setAutoLogin = (isLogin: boolean) => store.set(this.autoLogin, isLogin)

    // 删除自动登录
    static removeAutoLogin = () => store.remove(this.autoLogin)
}