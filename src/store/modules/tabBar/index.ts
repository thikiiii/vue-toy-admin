import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '#/router'
import router from '@/router'
import { RouteRecordName } from 'vue-router'
import { nextTick } from 'vue'


const useTabBarStore = defineStore('tabBar', {
    state: (): Store.TabBarStore => ({
        tabBar: [],
        cacheMenus: [],
        affixTabs: [],
        mainVisible: true
    }),
    actions: {
        isActive(tab: Store.TabBar) {
            return router.currentRoute.value.path === tab.path
        },

        // 是否存在
        isExist(path: string) {
            return this.tabBar.some(item => item.path === path)
        },

        // 获取 index
        getIndex(path: string) {
            return this.tabBar.findIndex(item => item.path === path)
        },

        // push tabBar
        push(tab: Store.TabBar) {
            // 不存在就 push
            !this.isExist(tab.path) && this.tabBar.push(tab)
            // name 为真，且 name 不存在就push
            tab.name && !this.cacheMenus.some(name => name === tab.name) && this.cacheMenus.push(tab.name)
        },

        // 关闭
        closeTab(tab: Store.TabBar) {
            const index = this.getIndex(tab.path)
            this.tabBar.splice(index, 1)
            // 激活状态 跳转到上一个标签
            this.isActive(tab) && router.push(this.tabBar[index - 1].path)
            if (!tab.meta?.keepAlive) return
            this.cacheMenus.splice(this.cacheMenus.findIndex(name => name === tab.name), 1)
        },

        // 关闭当前
        closeCurrent() {
            const route = router.currentRoute.value
            this.closeTab({
                path: route.path,
                meta: route.meta,
                name: route.name as RouteRecordName
            })
        },

        // 刷新当前
        refreshCurrent() {
            this.mainVisible = false
            void nextTick(() => {
                this.mainVisible = true
            })
        },

        // 关闭其他
        closeOther(path: string) {
            const i = this.tabBar.findIndex(item => item.path === path)
            if (i === -1) return
            this.tabBar = [ ...this.affixTabs, this.tabBar[i] ]
        },

        // 关闭全部
        closeAll() {
            this.tabBar = [ ...this.affixTabs ]
            router.push(this.tabBar[0].path)
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
            const affixTabs = this.filterAffixTabs(authRoutes)
            this.tabBar = [ ...affixTabs ]
            this.affixTabs = [ ...affixTabs ]
        }
    }
})

export default useTabBarStore