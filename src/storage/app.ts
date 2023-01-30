import store from 'store2'
// @ts-ignore
import { AppMenuSearchHistoryRecord } from '@/layout/header/components/AppSearch/AppSearchModal.vue'

// 系统
export class AppStorage {
    // 是否自动登录
    public static readonly autoLogin = 'AUTO_LOGIN'

    // App搜索记录
    public static readonly searchHistory = 'SEARCH_HISTORY'

    // settings
    public static readonly settings = 'TOY_SETTINGS'

    // 设置自动登录
    static setAutoLogin = (isLogin: boolean) => store.set(this.autoLogin, isLogin)

    // 删除自动登录
    static removeAutoLogin = () => store.remove(this.autoLogin)

    // 获取搜索记录
    static getSearchHistory = (): AppMenuSearchHistoryRecord[] => store.get(this.searchHistory) || []

    // 设置搜索记录
    static addSearchHistory = (searchHistoryItem: AppMenuSearchHistoryRecord) => {
        const searchHistory = this.getSearchHistory()
        const index = searchHistory.findIndex(item => item.path === searchHistoryItem.path)
        // 如果存在就删除原来的
        if (index !== -1) searchHistory.splice(index, 1)
        searchHistory.unshift(searchHistoryItem)
        store.set(this.searchHistory, searchHistory)
    }

    // 清空搜索记录
    static clearSearchHistory = () => store.remove(this.searchHistory)

    // 设置 settings
    static setSettings = (setting: AppSettings) => store.set(this.settings, setting)

    // 获取 settings
    static getSettings = (): AppSettings | undefined => store.get(this.settings)

    // 删除 settings
    static removeSettings = () => store.remove(this.settings)
}
