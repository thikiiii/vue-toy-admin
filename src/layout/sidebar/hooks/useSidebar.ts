import { computed } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

export const useSidebarStyle = () => {
    const layoutStore = useLayoutStore()
    const { sidebar } = layoutStore.$state
    // 侧边模式宽度
    const sideModeWidth = computed(() => {
        return `${sidebar.isCollapsedSidebar ? sidebar.collapsedSidebarWidth : sidebar.sidebarWidth}px`
    })

    // 混合侧边模式宽度
    const mixSideModeWidth = computed(() => {
        return `${sidebar.isCollapsedMixedSidebar ? sidebar.collapsedMixedSidebarWidth : sidebar.mixedSidebarWidth}px`
    })

    // 固定混合侧边模式宽度
    const fixedMixSideModeWidth = computed(() => {
        return `${ sidebar.isCollapsedMixedSidebar ?
            sidebar.collapsedMixedSidebarWidth + sidebar.sidebarWidth :
            sidebar.mixedSidebarWidth + sidebar.sidebarWidth }px`
    })

    return { sideModeWidth, mixSideModeWidth, fixedMixSideModeWidth }
}