import { defineStore } from 'pinia'
import { setCSSVariable } from '@/utils'
import { MenuModeEnum } from '@/enums/layout'

// 移动触发宽度
const mobileTriggerWidth = 800
export const useLayoutStore = defineStore('layout', {
    state: (): Store.LayoutStore => ({
        cssVariable: {
            sidebarWidth: '220px'
        },
        collapsedSidebarWidth: 64,
        isCollapsedSidebar: false,
        mobileTriggerWidth: mobileTriggerWidth,
        isMobile: document.body.offsetWidth <= mobileTriggerWidth,
        mobileMenuVisible: false,
        menuMode: MenuModeEnum.SIDE,
        footerVisible: true,
        isFixedFooter: true,
        isFixedHeaderAndTabBar: true,
        tabBarVisible: true
    }),
    getters: {},
    actions: {
        // 初始化css变量
        initCssVariable() {
            setCSSVariable(this.cssVariable)
        },
        // 设置折叠
        setCollapsed(collapsed: boolean) {
            this.isCollapsedSidebar = collapsed
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

