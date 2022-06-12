import { defineStore } from 'pinia'
import ThemeStorage from '@/storage/theme'
import { getSystemTheme, lighten } from '@/utils'
import { ThemeState, ThemeType } from '@/store/modules/theme/type'
import { darkTheme } from 'naive-ui'


// 主题颜色
const themeColor = '#5a6bff'
// 减轻颜色
const lightenColor = lighten(themeColor, 6)

// 主题
export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        theme: themeColor,
        themeType: ThemeStorage.getTheme() || getSystemTheme(),
        lightThemeOverrides: {
            common: {
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            }
        },
        darkThemeOverrides: {
            common: {
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            }
        },
        lightThemeConfig: {
            theme: themeColor,
            textColor: '#272828',
            subTextColor: '#606770',
            backgroundColor: '#ffffff',
            subBackgroundColor: '#f2f2f2',
            hover: '#e8e9ed',
            transparent: 'rgba(255,255,255,.7)',
            divder: 'rgba(0, 0, 0, .06)'
        },
        darkThemeConfig: {
            theme: themeColor,
            textColor: '#F5F6F7',
            subTextColor: '#d6d7d7',
            backgroundColor: '#242526',
            subBackgroundColor: '#2e3236',
            hover: '#343639',
            transparent: 'rgba(36,37,38,.7)',
            divder: 'rgba(255, 255, 255, .06)'
        }
    }),
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.themeType === 'dark' ? themeStore.darkThemeOverrides : themeStore.lightThemeOverrides,
        // 组件库主题类型
        naiveThemeType: (themeStore) => themeStore.themeType === 'dark' ? darkTheme : null
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
