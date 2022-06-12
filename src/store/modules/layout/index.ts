import { LayoutStore } from '@/store/modules/layout/type'
import { defineStore } from 'pinia'
import { LayoutStorage } from '@/storage/layout'

// 移动触发宽度
const mobileTriggerWidth = 800
export const useLayoutStore = defineStore('layout', {
    state: (): LayoutStore => ({
        headerHeight: '66px',
        tabBarHeight: '44px',
        sidebarWidth: '220px',
        sidebarCollapsedWidth: 64,
        collapsed: false,
        mobileTriggerWidth: mobileTriggerWidth,
        isMobile: document.body.offsetWidth <= mobileTriggerWidth,
        mobileMenuVisible: false,
        menuMode: LayoutStorage.getMenuMode() || 'side'
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

