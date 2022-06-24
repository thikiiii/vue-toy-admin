import store from 'store'


// 系统
export class SystemStorage {
    // 是否自动登录
    public static readonly autoLogin = 'AUTO_LOGIN'

    // App搜索记录
    public static readonly searchHistory = 'SEARCH_HISTORY'

    // 设置自动登录
    static setAutoLogin = (isLogin: boolean) => store.set(this.autoLogin, isLogin)

    // 删除自动登录
    static removeAutoLogin = () => store.remove(this.autoLogin)

    // 获取搜索记录
    static getSearchHistory = (): System.AppMenuSearch[] | undefined => store.get(this.searchHistory)

    // 设置搜索记录
    static setSearchHistory = (searchHistory: System.AppMenuSearch[]) => store.set(this.searchHistory, searchHistory)
}