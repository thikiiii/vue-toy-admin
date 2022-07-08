import store from 'store'

export class UserStorage {
    static readonly token = 'SIMPLE_TOKEN'

    // 设置 token
    static setToken = (token: string) => store.set(this.token, token)

    // 获取 token
    static getToken = (): string | undefined => store.get(this.token)

    // 删除 token
    static removeToken = () => store.remove(this.token)
}