export interface SystemStore {
    searchHistory: SearchHistory[]
}

export interface SearchHistory {
    // 图标
    icon: string
    // 路由地址
    path: string
    // title列表
    list: string[]
}