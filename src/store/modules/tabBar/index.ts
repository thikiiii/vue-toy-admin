import { defineStore } from 'pinia'
import { TabBar, TabBarStore } from '@/store/modules/tabBar/type'

const useTabBarStore = defineStore('tabBar', {
    state: (): TabBarStore => ({
        cacheWhiteList: [],
        tabBar: [
            {
                path: '/index',
                title: '测试'
            },
            {
                path: '/index2',
                title: '测试测试'
            }
        ],
        active: '/index'
    }),
    actions: {
        // push tabBar
        push(tab: TabBar) {
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
            this.tabBar = [ tab ]
        },
        // 关闭全部
        closeAll() {
            this.tabBar = []
        }
    }
})

export default useTabBarStore