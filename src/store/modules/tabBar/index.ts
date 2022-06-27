import { defineStore } from 'pinia'
import { Store } from '/#/store'

const useTabBarStore = defineStore('tabBar', {
    state: (): Store.TabBarStore => ({
        cacheWhiteList: [],
        tabBar: [
            {
                path: '/index',
                keepAlive: false,
                title: '测试'
            },
            {
                path: '/index2',
                keepAlive: false,
                title: '测试测试'
            }
        ],
        active: '/index'
    }),
    actions: {
        // push tabBar
        push(tab: Store.TabBar) {
            this.tabBar.push(tab)
        },
        // 删除
        remove(path: string) {
            this.tabBar.splice(this.tabBar.findIndex(item => item.path === path), 1)
        },
        // 关闭当前
        closeCurrent() {
            this.remove(this.active)
        },
        // 刷新当前
        refreshCurrent() {
        
        },
        // 关闭其他
        closeOther() {
            const tab = this.tabBar.find(item => item.path === this.active)
            if (!tab) return
            this.tabBar = [tab]
        },
        // 关闭全部
        closeAll() {
            this.tabBar = []
        }
    }
})

export default useTabBarStore