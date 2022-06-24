import { defineStore } from 'pinia'
import { StoreStorage } from '@/storage/store'
import { Store } from '/#/store'

// 移动触发宽度
const mobileTriggerWidth = 800
export const useLayoutStore = defineStore('layout', {
    state: (): Store.LayoutStore => ({
        collapsedWidth: 64,
        collapsed: false,
        mobileTriggerWidth: mobileTriggerWidth,
        isMobile: document.body.offsetWidth <= mobileTriggerWidth,
        mobileMenuVisible: false,
        menuMode: StoreStorage.getMenuMode() || 'top'
    }),
    getters: {},
    actions: {
        // 设置折叠
        setCollapsed(collapsed: boolean) {
            this.collapsed = collapsed
        },
        // 判断是否是移动端
        judgeMobile() {
            this.isMobile = document.body.offsetWidth <= this.mobileTriggerWidth
            !this.isMobile && this.setMobileMenuVisible(false)
        },
        setMobileMenuVisible(mobileMenuVisible) {
            this.mobileMenuVisible = mobileMenuVisible
        }
    }
})

