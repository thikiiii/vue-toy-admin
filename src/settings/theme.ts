// 减轻主题色
import { colorHexToRgb, lightenColor } from '@/utils'
import { appSettings } from '@/settings/app'
import { GlobalThemeOverrides } from 'naive-ui'

const lightenThemeColor = lightenColor(appSettings.theme, 10)
// 淡化的主题色
const fadedThemeColor = colorHexToRgb(appSettings.theme, 0.1)
// 阴影主题色
const shadowThemeColor = colorHexToRgb(appSettings.theme, 0.5)

// 明亮主题配置
export const lightThemeConfig: Store.CustomizeThemeConfig = {
    theme: appSettings.theme,
    fadedThemeColor: fadedThemeColor,
    mainTextColor: '#121828',
    subTextColor: '#65748b',
    invertTextColor: '#edf2f7',
    hoverTextColor: '#d1d5db',
    mainBackgroundColor: '#f9fafc',
    subBackgroundColor: '#FFFFFF',
    invertBackgroundColor: '#191e2c',
    hoverBackgroundColor: 'rgb(243, 243, 245)',
    hoverInvertBackgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderColor: '#212B36',
    divider: 'rgba(145,158,171,0.24)',
    scrollColor: '#c2cbd3',
    themeShadow: shadowThemeColor,
    shadow: 'rgba(0,0,0,0.1)'
}

// 暗黑主题配置
export const darkThemeConfig: Store.CustomizeThemeConfig = {
    theme: appSettings.theme,
    fadedThemeColor: fadedThemeColor,
    mainTextColor: '#edf2f7',
    subTextColor: '#a0aec0',
    invertTextColor: '#edf2f7',
    hoverTextColor: '',
    mainBackgroundColor: '#0b0f19',
    subBackgroundColor: '#191e2c',
    invertBackgroundColor: '#191e2c',
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.09)',
    hoverInvertBackgroundColor: 'rgb(243, 243, 245)',
    borderColor: '#212B36',
    divider: 'rgb(45,55,72)',
    scrollColor: '#3a4651',
    themeShadow: shadowThemeColor,
    shadow: 'rgba(255,255,255,0.05)'
}


export const naiveThemeConfig = (themeConfig: Store.CustomizeThemeConfig): GlobalThemeOverrides => ({
    common: {
        // 主字体颜色
        textColor2: themeConfig.mainTextColor,
        // 副字体颜色
        textColor3: themeConfig.subTextColor,
        // 卡片、侧边栏、头部的背景
        cardColor: themeConfig.subBackgroundColor,
        // 主内容背景
        bodyColor: themeConfig.mainBackgroundColor,
        // 模态框背景
        modalColor: themeConfig.subBackgroundColor,
        // 反转背景
        invertedColor: themeConfig.invertBackgroundColor,
        // 弹出框背景
        popoverColor: themeConfig.subBackgroundColor,
        primaryColor: appSettings.theme,
        primaryColorHover: lightenThemeColor,
        primaryColorPressed: lightenThemeColor,
        primaryColorSuppl: lightenThemeColor
    },
    Card: {
        color: themeConfig.subBackgroundColor,
        borderRadius: '8px'
    },
    Menu: {
        // 菜单字体反转颜色
        itemTextColorInverted: themeConfig.invertTextColor,
        // 菜单背景反转颜色
        colorInverted: themeConfig.invertBackgroundColor
    }
})

// 系统主题色
export const systemThemes = [
    appSettings.theme,
    '#E74C3C',
    '#8E44AD',
    '#3498DB',
    '#16A085',
    '#2ECC71',
    '#F1C40F',
    '#F39C12',
    '#D35400'
]