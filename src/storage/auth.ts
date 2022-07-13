import Settings from '@/settings'
import Cookies from 'js-cookie'

export class AuthCookie {
    static readonly token = 'SIMPLE_TOKEN'

    // 设置 token
    static setToken = (token: string) => Cookies.set(this.token, token, { expires: Settings.tokenExpirationTime })

    // 获取 token
    static getToken = (): string | undefined => Cookies.get(this.token)

    // 删除 token
    static removeToken = () => Cookies.remove(this.token)
}