import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { ThemeStorage } from '@/storage/theme'
import { setCSSVariable } from '@/utils'
import { darkThemeConfig, lightThemeConfig, naiveThemeConfig } from '@/settings/theme'
import { appSettings } from '@/settings/app'


// 主题
export const useThemeStore = defineStore('theme', {
    state: (): Store.ThemeStore => ({
        theme: appSettings.theme,
        themeMode: appSettings.themeMode,
        customize: {
            light: lightThemeConfig,
            dark: darkThemeConfig
        },
        naive: {
            light: naiveThemeConfig(lightThemeConfig),
            dark: naiveThemeConfig(darkThemeConfig)
        }
    }),
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.naive[themeStore.themeMode],

        // 组件库主题类型
        naiveThemeType: (themeStore) => themeStore.themeMode === 'dark' ? darkTheme : null
    },
    actions: {
        // 初始化主题
        initTheme() {
            this.setTheme(ThemeStorage.getTheme() || this.themeMode)
        },
        // 切换明亮或者暗黑主题
        toggleLightOrDarkTheme() {
            const type = this.themeMode === 'light' ? 'dark' : 'light'
            this.themeMode = type
            this.setTheme(type)
        },
        // 设置主题
        setTheme(themeType: Store.ThemeMode) {
            const body = document.body
            // 去除过渡效果
            body.classList.add('noTransition')
            this.themeMode = themeType
            // 在 storage 中存储主题类型
            ThemeStorage.setTheme(themeType)
            const theme = this.customize[themeType]
            setCSSVariable(theme)
            setTimeout(() => body.classList.remove('noTransition'))
        }
    }
})
