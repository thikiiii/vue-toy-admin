import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '#/router'


const useTabBarStore = defineStore('tabBar', {
    state: (): Store.TabBarStore => ({
        tabBar: [],
        cacheMenus: [],
        affixTabs: []
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
        filterAffixTabs(authRoutes: AppRouteRecordRaw[]) {
            authRoutes.filter(route => {
                route.meta?.affix
            })
        },

        // 设置固定标签
        setAffixTabs(authRoutes: AppRouteRecordRaw[]) {
            this.filterAffixTabs(authRoutes)
        }
    }
})

export default useTabBarStore