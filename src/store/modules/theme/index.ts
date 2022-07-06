import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { themeState } from '@/store/modules/theme/state'
import { Store } from '/#/store'
import { StoreStorage } from '@/storage/store'


// 主题
export const useThemeStore = defineStore('theme', {
    state: (): Store.ThemeStore => themeState,
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.naive[themeStore.themeType],
        // 组件库主题类型
        naiveThemeType: (themeStore) => themeStore.themeType === 'dark' ? darkTheme : null
    },
    actions: {
        // 初始化主题
        initTheme() {
            this.setTheme(StoreStorage.getTheme() || this.themeType)
        },
        // 切换主题
        toggleTheme() {
            const type = this.themeType === 'light' ? 'dark' : 'light'
            this.themeType = type
            this.setTheme(type)
        },
        // 设置主题
        setTheme(themeType: Store.ThemeType) {
            const bodyElement = document.querySelector('body')
            if (!bodyElement) return false
            this.themeType = themeType
            // 在 storage 中存储主题类型
            StoreStorage.setTheme(themeType)
            const theme = this.customize[themeType]
            Object.keys(theme).forEach(key => {
                // 设置系统主题
                bodyElement.style.setProperty(`--${ key }`, theme[key])
            })
        }
    }
})
