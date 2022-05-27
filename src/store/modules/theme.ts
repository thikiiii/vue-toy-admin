import { defineStore } from 'pinia'

import { GlobalThemeOverrides } from 'naive-ui'
import {
    DEFAULT_DARK_THEME_CONFIG,
    DEFAULT_LIGHT_THEME_CONFIG,
    DEFAULT_THEME,
    DEFAULT_THEME_TYPE
} from '@/settings/theme'

// 主题类型
export type ThemeType = 'light' | 'dark'

// 主题接口
export interface StateTheme {
    // 系统主题颜色
    thmem: string
    // 当前主题类型
    themeType: ThemeType
    // 明亮主题覆盖
    lightThemeOverrides: GlobalThemeOverrides,
    // 暗黑主题覆盖
    darkThemeOverrides: GlobalThemeOverrides
}

// 主题
export const useStoreTheme = defineStore('theme', {
    state: (): StateTheme => ({
        thmem: DEFAULT_THEME,
        themeType: DEFAULT_THEME_TYPE,
        lightThemeOverrides: DEFAULT_LIGHT_THEME_CONFIG,
        darkThemeOverrides: DEFAULT_DARK_THEME_CONFIG
    }),
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.themeType === 'dark' ? themeStore.darkThemeOverrides : themeStore.lightThemeOverrides
    },
    actions: {
        // ... 可扩展修改主题的方法
    }
})