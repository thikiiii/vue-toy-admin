import { LayoutStore } from '@/store/modules/layout/type'
import { defineStore } from 'pinia'

const mobileTriggerWidth = 800
export const useLayoutStore = defineStore('layout', {
    state: (): LayoutStore => ({
        headerHeight: '66px',
        tabBarHeight: '44px',
        sidebarWidth: 220,
        sidebarCollapsedWidth: 64,
        collapsed: false,
        mobileTriggerWidth: mobileTriggerWidth,
        isMobile: document.body.offsetWidth <= mobileTriggerWidth
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
        }
    }
})

