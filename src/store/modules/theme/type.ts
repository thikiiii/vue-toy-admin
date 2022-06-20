// 主题类型
import { GlobalThemeOverrides } from 'naive-ui'

export type ThemeType = 'light' | 'dark'

// 自定义主题配置
export interface CustomizeThemeConfig {
    // 主题颜色
    theme: string

    // 主字体颜色
    mainTextColor: string

    // 副字体颜色
    subTextColor: string

    // hover字体颜色
    hoverTextColor: string

    // 反字体颜色
    invertTextColor: string

    // 背景颜色
    mainBackgroundColor: string

    // 副背景颜色
    subBackgroundColor: string

    // hover背景颜色
    hoverBackgroundColor: string

    // 反背景颜色
    invertBackgroundColor: string

    // 边框
    borderColor: string

    // 分割线
    divder: string

    // 滚动条
    scroll: string
}

type ThemeTypeConfig<T> = {
    [themeType in ThemeType]: T
}

// 主题 state
export interface ThemeStore {
    // 主题颜色
    theme: string
    // 当前主题类型
    themeType: ThemeType
    // naive 主题
    naive: ThemeTypeConfig<GlobalThemeOverrides>
    // 自定义主题
    customize: ThemeTypeConfig<CustomizeThemeConfig>
}