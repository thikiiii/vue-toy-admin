import { defineStore } from 'pinia'
import router from '@/router'
import { nextTick } from 'vue'
import { useRouteStore } from '@/store/modules/route'


const useTabBarStore = defineStore('tabBar', {
    state: (): Store.TabBarStore => ({
        tabBar: [],
        cacheMenus: [],
        affixTabs: [],
        mainVisible: true
    }),
    actions: {
        // 是否激活
        isActive(path: string) {
            return router.currentRoute.value.path === path
        },

        // 是否存在
        isExist(path: string) {
            return this.tabBar.some(item => item.path === path)
        },

        // 获取 index
        getIndex(path: string) {
            return this.tabBar.findIndex(item => item.path === path)
        },

        // 添加 tabBar
        addTab(tab: Store.TabBar) {
            // 不存在就 push
            !this.isExist(tab.path) && this.tabBar.push(tab)
            // name 为真，且 name 不存在就push
            tab.name
            && !this.cacheMenus.some(name => name === tab.name)
            && this.cacheMenus.push(tab.name)
        },

        // 关闭
        closeTab(tab: Store.TabBar) {
            const index = this.getIndex(tab.path)
            this.tabBar.splice(index, 1)
            // 激活状态 跳转到上一个标签
            this.isActive(tab.path) && router.push(this.tabBar[index - 1].path)
            if (!tab.meta?.keepAlive) return
            this.cacheMenus.splice(this.cacheMenus.findIndex(name => name === tab.name), 1)
        },

        // 刷新当前激活的路由
        refreshCurrent() {
            this.mainVisible = false
            void nextTick(() => {
                this.mainVisible = true
            })
        },

        // 关闭左侧
        closeLeft(path: string) {
            const index = this.getIndex(path)
            if (index === 0 || index === -1) return
            const tabs = this.tabBar.slice(index)
            this.tabBar = [ ...this.affixTabs, ...tabs ]
            this.setCacheMenus()
            this.routeNotMatchedRedirectHome()
        },

        // 关闭右侧
        closeRight(path: string) {
            const index = this.getIndex(path)
            if (index === this.tabBar.length - 1 || index === -1) return
            const tabs = this.tabBar.slice(0, index + 1)
            this.tabBar = [ ...this.affixTabs, ...tabs.filter(item => !item.meta?.affix) ]
            this.setCacheMenus()
            this.routeNotMatchedRedirectHome()
        },

        // 关闭其他
        closeOther(path: string) {
            const i = this.getIndex(path)
            if (i === -1) return
            const tabs = [ ...this.affixTabs ]
            const tab = this.tabBar[i]
            if (!tab.meta?.affix) tabs.push(tab)
            this.tabBar = tabs
            this.setCacheMenus()
            this.routeNotMatchedRedirectHome()
        },

        // 关闭全部
        closeAll() {
            this.tabBar = [ ...this.affixTabs ]
            this.setCacheMenus()
            // 重定向到首页
            const routeStore = useRouteStore()
            routeStore.redirectToHomepage()
        },

        // 筛选固定标签
        filterAffixTabs(authRoutes: Route.RouteRecordRaw[]): Store.TabBar[] {
            const tabs: Store.TabBar[] = []
            const filter = (authRoutes: Route.RouteRecordRaw[]) => {
                authRoutes.forEach(route => {
                    if (route.meta?.affix) tabs.push({
                        path: route.path,
                        meta: route.meta,
                        name: route.name
                    })
                    if (route.children) filter(route.children)
                })
            }
            filter(authRoutes)
            return tabs
        },

        // 设置缓存菜单
        setCacheMenus() {
            this.cacheMenus = this.tabBar.reduce<string[]>((cacheMenus, item) => {
                item.meta?.keepAlive && cacheMenus.push(item.name as string)
                return cacheMenus
            }, [])
        },

        // 匹配不到当前路由重定向到首页
        routeNotMatchedRedirectHome() {
            const routeStore = useRouteStore()
            if (!this.isExist(router.currentRoute.value.path)) routeStore.redirectToHomepage()
        },
        // 设置固定标签
        setAffixTabs(authRoutes: Route.RouteRecordRaw[]) {
            const affixTabs = this.filterAffixTabs(authRoutes)
            this.tabBar = [ ...affixTabs ]
            this.affixTabs = [ ...affixTabs ]
            this.setCacheMenus()
        }
    }
})

export default useTabBarStore