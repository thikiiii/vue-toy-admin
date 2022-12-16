import { defineStore } from 'pinia'
import { ThemeStorage } from '@/storage/theme'
import { setCSSVariable } from '@/utils'
import { darkThemeConfig, lightThemeConfig, naiveThemeConfig } from '@/settings/theme'
import { appSettings } from '@/settings/app'
import { darkTheme } from 'naive-ui'

const { theme, themeMode, followSystem } = appSettings

// 主题
export const useThemeStore = defineStore('theme', {
    state: (): Store.ThemeStore => ({
        theme,
        themeMode,
        followSystem,
        customize: {
            light: lightThemeConfig(theme),
            dark: darkThemeConfig(theme)
        },
        naive: {
            light: naiveThemeConfig(lightThemeConfig(theme)),
            dark: naiveThemeConfig(darkThemeConfig(theme))
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
            if (this.followSystem) {
                this.setTheme(this.getSystemThemeMode())
                this.onSystemThemeChange()
            } else {
                this.setTheme(ThemeStorage.getTheme() || this.themeMode)
            }
        },
        // 切换明亮或者暗黑主题
        toggleLightOrDarkTheme() {
            const type = this.themeMode === 'light' ? 'dark' : 'light'
            this.themeMode = type
            this.setTheme(type)
        },
        // 设置主题颜色
        setThemeColor(color: string) {
            this.noTransition(() => {
                this.theme = color
                Object.keys(this.customize).forEach((key: Store.ThemeMode) => {
                    switch (key) {
                        case 'light':
                            this.customize[key] = lightThemeConfig(color)
                            break
                        case 'dark':
                            this.customize[key] = darkThemeConfig(color)
                            break
                    }
                })
                Object.keys(this.naive).forEach(key => this.naive[key] = naiveThemeConfig(this.customize[key]))
                setCSSVariable(this.customize[this.themeMode])
            })
        },
        noTransition(callback: () => void) {
            const body = document.body
            // 去除过渡效果
            body.classList.add('noTransition')
            callback()
            setTimeout(() => body.classList.remove('noTransition'))
        },
        // 设置主题
        setTheme(themeType: Store.ThemeMode) {
            this.noTransition(() => {
                this.themeMode = themeType
                const theme = this.customize[themeType]
                setCSSVariable(theme)
            })
        },
        // 获取系统主题模式
        getSystemThemeMode(): Store.ThemeMode {
            const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
            return themeMedia.matches ? 'light' : 'dark'
        },
        systemThemeChange() {
            this.setTheme(this.getSystemThemeMode())
        },
        // 监听系统主题变化
        onSystemThemeChange() {
            const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
            // 监听主题变更
            matchMedia.addEventListener('change', this.systemThemeChange)
        },
        // 删除监听系统主题变化
        removeSystemThemeChange() {
            const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
            // 监听主题变更
            matchMedia.removeEventListener('change', this.systemThemeChange)
        }
    }
})
