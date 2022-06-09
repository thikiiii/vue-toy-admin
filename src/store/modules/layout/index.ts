import { LayoutStore } from '@/store/modules/layout/type'

export const useLayoutStore = defineStore('layout', {
    state: (): LayoutStore => ({
        sidebarWidth: 220,
        sidebarCollapsedWidth: 64,
        collapsed: false
    }),
    getters: {},
    actions: {
        // 设置折叠
        setCollapsed(collapsed:boolean) {
            this.collapsed = collapsed
        }
    }
})

