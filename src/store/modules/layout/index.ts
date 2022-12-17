import { defineStore } from 'pinia'
import { appSettings } from '@/settings/app'

const { sidebar, header, footer, app } = appSettings

const mobileTriggerWidth = 800
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
        toggleCollapsed(collapsed?: boolean) {
            this.sidebar.isCollapsedSidebar = collapsed || !this.sidebar.isCollapsedSidebar
        },

        // 切换折叠混合侧边栏
        toggleFixedMixedSidebar(fixed?: boolean) {
            this.sidebar.isFixedMixedSidebar = fixed || !this.sidebar.isFixedMixedSidebar
        },

        // 切换固定混合侧边栏
        toggleCollapsedMixedSidebar(collapsed?: boolean) {
            this.sidebar.isCollapsedMixedSidebar = collapsed || !this.sidebar.isCollapsedMixedSidebar
        },

        toggleMobileMenuVisible(mobileMenuVisible?: boolean) {
            this.mobile.mobileMenuVisible = mobileMenuVisible || !this.mobile.mobileMenuVisible
        }
    }
})

