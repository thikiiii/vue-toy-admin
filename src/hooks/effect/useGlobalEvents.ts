import { useEventListener } from '@vueuse/core'
import { AppStorage } from '@/storage/app'
import { useThemeStore } from '@/store/modules/theme'
import { useLayoutStore } from '@/store/modules/layout'

// 全局事件
export const useGlobalEvents = () => {
    const themeStore = useThemeStore()
    const layoutStore = useLayoutStore()
    const { header, sidebar, footer, app, mobile } = layoutStore.$state
    const { theme, themeMode, followSystem } = themeStore.$state

    // 监听窗口关闭
    useEventListener(window, 'unload', () => {
        AppStorage.setSettings({ theme, themeMode, followSystem, header, sidebar, footer, app })
    })

    // 监听窗口大小变化
    useEventListener(window, 'resize', () => {
        mobile.isMobile = document.body.offsetWidth <= mobile.mobileTriggerWidth
    })
}