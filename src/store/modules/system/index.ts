import { defineStore } from 'pinia'
import { SearchHistory, SystemStore } from '@/store/modules/system/type'
import { SystemStorage } from '@/storage/system'

const useSystemStore = defineStore('system', {
    state: (): SystemStore => ({
        searchHistory: SystemStorage.getSearchHistory() || []
    }),
    actions: {
        // 设置历史记录
        setSearchHistory(searchHistory: SearchHistory[]) {
            this.searchHistory = searchHistory
        },
        // push历史记录
        pushSearchHistory(searchHistory: SearchHistory) {
            this.searchHistory.push(searchHistory)
        },
        // 清空历史记录
        clearSearchHistory() {
            this.searchHistory = []
        }
    }
})
export default useSystemStore