import { colorHexToRgb, lightenColor } from '@/utils'

import { GlobalThemeOverrides } from 'naive-ui'

import AppSettings from '@/settings'


// 减轻主题色
const lightenThemeColor = lightenColor(AppSettings.theme, 10)
// 淡化的主题色
const fadedThemeColor = colorHexToRgb(AppSettings.theme, 0.1)
// 阴影主题色
const shadowThemeColor = colorHexToRgb(AppSettings.theme, 0.5)


const lightThemeConfig: Store.CustomizeThemeConfig = {
    theme: AppSettings.theme,
    fadedThemeColor: fadedThemeColor,
    mainTextColor: '#121828',
    subTextColor: '#65748b',
    invertTextColor: '#d1d5db',
    hoverTextColor: '#d1d5db',
    mainBackgroundColor: '#f9fafc',
    subBackgroundColor: '#FFFFFF',
    invertBackgroundColor: '#111827',
    hoverBackgroundColor: 'rgb(243, 243, 245)',
    borderColor: '#212B36',
    divider: 'rgba(145,158,171,0.24)',
    scrollColor: '#c2cbd3',
    themeShadow: shadowThemeColor,
    shadow: 'rgba(0,0,0,0.1)'
}

const darkThemeConfig: Store.CustomizeThemeConfig = {
    theme: AppSettings.theme,
    fadedThemeColor: fadedThemeColor,
    mainTextColor: '#edf2f7',
    subTextColor: '#a0aec0',
    invertTextColor: '#d1d5db',
    hoverTextColor: '',
    mainBackgroundColor: '#0b0f19',
    subBackgroundColor: '#191e2c',
    invertBackgroundColor: '#191e2c',
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderColor: '#212B36',
    divider: 'rgb(45,55,72)',
    scrollColor: '#3a4651',
    themeShadow: shadowThemeColor,
    shadow: 'rgba(255,255,255,0.05)'
}


const naiveConfig = (
    {
        mainTextColor,
        subTextColor,
        subBackgroundColor,
        mainBackgroundColor,
        invertBackgroundColor,
        invertTextColor
    }: Store.CustomizeThemeConfig): GlobalThemeOverrides => ({
    common: {
        // 主字体颜色
        textColor2: mainTextColor,
        // 副字体颜色
        textColor3: subTextColor,
        // 侧边栏、头部的背景
        cardColor: subBackgroundColor,
        // 主内容背景
        bodyColor: mainBackgroundColor,
        // 模态框背景
        modalColor: subBackgroundColor,
        // 反转背景
        invertedColor: invertBackgroundColor,
        // 弹出框背景
        popoverColor: subBackgroundColor,
        primaryColor: AppSettings.theme,
        primaryColorHover: lightenThemeColor,
        primaryColorPressed: lightenThemeColor,
        primaryColorSuppl: lightenThemeColor
    },
    Card: {
        color: subBackgroundColor,
        borderRadius: '8px'
    },
    Menu: {
        // 菜单字体反转颜色
        itemTextColorInverted: invertTextColor,
        // 菜单背景反转颜色
        colorInverted: invertBackgroundColor
    }
})

export const initThemeState: Store.ThemeStore = {
    theme: AppSettings.theme,
    themeMode: AppSettings.themeMode,
    customize: {
        light: lightThemeConfig,
        dark: darkThemeConfig
    },
    naive: {
        light: naiveConfig(lightThemeConfig),
        dark: naiveConfig(darkThemeConfig)
    }
}