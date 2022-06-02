// 主题类型
import { GlobalThemeOverrides } from 'naive-ui'

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