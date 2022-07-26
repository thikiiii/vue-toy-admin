import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '#/router'


const useTabBarStore = defineStore('tabBar', {
    state: (): Store.TabBarStore => ({
        tabBar: [],
        active: null,
        cacheMenus: []
    }),
    actions: {
        // push tabBar
        push(tab: Store.TabBar) {
            !this.tabBar.some(item => item.path === tab.path) && this.tabBar.push(tab)
            tab.name && !this.cacheMenus.some(name => name === tab.name) && this.cacheMenus.push(tab.name)
        },

        // 删除
        remove(path: string) {
            this.tabBar.splice(this.tabBar.findIndex(item => item.path === path), 1)
        },

        // 关闭当前
        closeCurrent() {

        },

        // 刷新当前
        refreshCurrent() {

        },
        // 关闭其他
        closeOther(path: string) {
            const i = this.tabBar.findIndex(item => item.path === path)
            if (i === -1) return
            this.tabBar = [ this.tabBar[i] ]
        },

        // 关闭全部
        closeAll() {
            this.tabBar = []
        },

        // 筛选固定标签
        filterAffixTabs(authRoutes: AppRouteRecordRaw[]): Store.TabBar[] {
            const tabs: Store.TabBar[] = []
            const filter = (authRoutes: AppRouteRecordRaw[]) => {
                authRoutes.forEach(route => {
                    if (route.meta?.affix) tabs.push({
                        path: route.path,
                        meta: route.meta
                    })
                    if (route.children) filter(route.children)
                })
            }
            filter(authRoutes)
            return tabs
        },

        // 设置固定标签
        setAffixTabs(authRoutes: AppRouteRecordRaw[]) {
            this.tabBar = this.filterAffixTabs(authRoutes)
        }
    }
})

export default useTabBarStore