import { defineStore } from 'pinia'

import { GlobalThemeOverrides } from 'naive-ui'
import ThemeStorage from '@/storage/theme'
import { getSystemTheme, lighten } from '@/utils'

// 主题类型
export type ThemeType = 'light' | 'dark'

// 主题接口
export interface Theme {
    // 系统主题颜色
    theme: string
    // 当前主题类型
    themeType: ThemeType
}

// 组件主题接口
export interface StateNaiveComponentTheme extends Theme {
    // 明亮主题覆盖
    lightThemeOverrides: GlobalThemeOverrides,
    // 暗黑主题覆盖
    darkThemeOverrides: GlobalThemeOverrides
}

// 系统主题接口
export interface StateSystemTheme {
    // 明亮主题配置
    lightThemeConfig: {},
    // 暗黑主题配置
    darkThemeConfig: {},
}

const themeColor = '#717ff9'
// 减轻颜色
const lightenColor = lighten(themeColor, 6)
// 主题
export const useThemeStore = defineStore('theme', {
    state: (): StateNaiveComponentTheme & StateSystemTheme => ({
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
        lightThemeConfig: {},
        darkThemeConfig: {}
    }),
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.themeType === 'dark' ? themeStore.darkThemeOverrides : themeStore.lightThemeOverrides
    },
    actions: {
        // 切换主题
        toggleTheme() {
            const type = this.themeType === 'light' ? 'dark' : 'light'
            this.themeType = type
            ThemeStorage.setTheme(type)
        },
        // 设置主题
        setTheme(themeType: ThemeType) {
            this.themeType = themeType
        }
        // ... 可扩展修改主题的方法
    }
})
