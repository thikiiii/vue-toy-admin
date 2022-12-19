import { useLayoutStore } from '@/store/modules/layout'
import { watchEffect } from 'vue'
import { setCSSVariable } from '@/utils'

export const subscribeLayout = () => {
    const layoutStore = useLayoutStore()
    const { sidebar, footer, header } = layoutStore.$state

    // 侦听 布局变量变化
    watchEffect(() => {
        const { sidebarWidth, mixedSidebarWidth, collapsedSidebarWidth, collapsedMixedSidebarWidth } = sidebar
        const { footerHeight } = footer
        const { headerHeight,tabBarHeight } = header
        const originalVariable = {
            sidebarWidth,
            mixedSidebarWidth,
            collapsedSidebarWidth,
            collapsedMixedSidebarWidth,
            footerHeight,
            headerHeight,
            tabBarHeight
        }
        const cssVariable = Object.keys(originalVariable).reduce<{ [k: string]: string }>((variable, key) => {
            variable[key] = `${ originalVariable[key] }px`
            return variable
        }, {})

        setCSSVariable(cssVariable)
    })
}