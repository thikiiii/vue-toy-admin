import store from 'store2'

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
    static getSearchHistory = (): System.AppMenuSearchHistoryRecord[] => store.get(this.searchHistory) || []

    // 设置搜索记录
    static addSearchHistory = (searchHistoryItem: System.AppMenuSearchHistoryRecord) => {
        const searchHistory = this.getSearchHistory()
        const index = searchHistory.findIndex(item => item.path === searchHistoryItem.path)
        // 如果存在就删除原来的
        if (index !== -1) searchHistory.splice(index, 1)
        searchHistory.unshift(searchHistoryItem)
        store.set(this.searchHistory, searchHistory)
    }

    // 清空搜索记录
    static clearSearchHistory = () => store.remove(this.searchHistory)
}