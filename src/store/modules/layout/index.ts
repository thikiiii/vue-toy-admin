import { defineStore } from 'pinia'
import { appSettings } from '@/settings/app'

const { sidebar, header, footer, app } = appSettings

const mobileTriggerWidth = 600
export const useLayoutStore = defineStore('layout', {
    state: (): Store.LayoutStore => ({
        sidebar,
        header,
        footer,
        mobile: {
            // 移动端触发宽度
            mobileTriggerWidth: mobileTriggerWidth,

            // 是否移动端
            isMobile: document.body.offsetWidth <= mobileTriggerWidth,

            // 移动端 menu 可见
            mobileMenuVisible: false
        },
        app
    }),
    getters: {},
    actions: {
        // 切换折叠
        toggleCollapsed(collapsed: boolean) {
            this.sidebar.isCollapsedSidebar = collapsed || !this.sidebar.isCollapsedSidebar
        },

        toggleMobileMenuVisible(mobileMenuVisible) {
            this.mobile.mobileMenuVisible = mobileMenuVisible || !this.mobile.mobileMenuVisible
        }
    }
})

