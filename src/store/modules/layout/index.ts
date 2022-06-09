import { LayoutStore } from '@/store/modules/layout/type'

export const useLayoutStore = defineStore('layout', {
    state: (): LayoutStore => ({
        headerHeight: '66px',
        tabBarHeight: '44px',
        sidebarWidth: 220,
        sidebarCollapsedWidth: 64,
        collapsed: false,
        mobileTriggerWidth: 800
    }),
    getters: {},
    actions: {
        // 设置折叠
        setCollapsed(collapsed: boolean) {
            this.collapsed = collapsed
        }
    }
})

