import { defineStore } from 'pinia'

import { GlobalThemeOverrides } from 'naive-ui'
import ThemeStorage from '@/storage/theme'
import { getSystemTheme, lighten } from '@/utils'

// 主题类型
export type ThemeType = 'light' | 'dark'


// 系统主题配置
export interface SystemThemeConfig {
    // 主题颜色
    theme: string
    // 字体颜色
    textColor: string
    // 副字体颜色
    subTextColor: string
    // 背景颜色
    backgroundColor: string
    // 副背景颜色
    subBackgroundColor: string
    // 滚动条颜色
    scrollColor: string
    // 透明
    hover: string
    // 透明背景
    transparent: string
    // 分割线
    divder: string
}


// 主题 state
export interface ThemeState {
    // 主题颜色
    theme: string
    // 当前主题类型
    themeType: ThemeType
    // 明亮主题覆盖
    lightThemeOverrides: GlobalThemeOverrides
    // 暗黑主题覆盖
    darkThemeOverrides: GlobalThemeOverrides
    // 系统明亮主题
    lightThemeConfig: SystemThemeConfig
    // 系统暗黑主题
    darkThemeConfig: SystemThemeConfig
}

// 主题颜色
const theme = '#5a6bff'
// 减轻颜色
const lightenColor = lighten(theme, 6)

// 主题
export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        theme,
        themeType: ThemeStorage.getTheme() || getSystemTheme(),
        lightThemeOverrides: {
            common: {
                primaryColor: theme,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            }
        },
        darkThemeOverrides: {
            common: {
                primaryColor: theme,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            }
        },
        lightThemeConfig: {
            theme,
            textColor: '#272828',
            subTextColor: '#606770',
            backgroundColor: '#ffffff',
            subBackgroundColor: '#f2f2f2',
            scrollColor: 'rgba(0, 0, 0, 0.5)',
            hover: '#e8e9ed',
            transparent: 'rgba(255,255,255,.7)',
            divder: 'rgba(0, 0, 0, .06)'
        },
        darkThemeConfig: {
            theme,
            textColor: '#F5F6F7',
            subTextColor: '#d6d7d7',
            backgroundColor: '#242526',
            subBackgroundColor: '#2e3236',
            scrollColor: 'rgba(255, 255, 255, 0.5)',
            hover: '#343639',
            transparent: 'rgba(36,37,38,.7)',
            divder: 'rgba(255, 255, 255, .06)'
        }
    }),
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.themeType === 'dark' ? themeStore.darkThemeOverrides : themeStore.lightThemeOverrides
    },
    actions: {
        // 初始化主题
        initTheme() {
            this.setTheme(ThemeStorage.getTheme() || this.themeType)
        },
        // 切换主题
        toggleTheme() {
            const type = this.themeType === 'light' ? 'dark' : 'light'
            this.themeType = type
            this.setTheme(type)
        },
        // 设置主题
        setTheme(themeType: ThemeType) {
            const bodyElement = document.querySelector('body')
            if (!bodyElement) return false
            this.themeType = themeType
            // 在 storage 中存储主题类型
            ThemeStorage.setTheme(themeType)
            const systemThemeConfig = themeType === 'light' ? this.lightThemeConfig : this.darkThemeConfig
            Object.keys(systemThemeConfig).forEach(key => {
                // 设置系统主题
                bodyElement.style.setProperty(`--${ key }`, systemThemeConfig[key])
            })
        }
    }
})
