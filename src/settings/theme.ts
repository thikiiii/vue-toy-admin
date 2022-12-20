// 减轻主题色
import { colorHexToRgb, lightenColor } from '@/utils'
import { GlobalThemeOverrides } from 'naive-ui'


// 明亮主题配置
export const lightThemeConfig = (theme: string): Store.CustomizeThemeConfig => (
    {
        theme: theme,
        fadedThemeColor: colorHexToRgb(theme, 0.1),
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
        divider: 'rgba(145,158,171,0.2)',
        scrollColor: '#c2cbd3',
        themeShadow: colorHexToRgb(theme, 0.3),
        shadow: 'rgba(0,0,0,0.1)'
    }
)

// 暗黑主题配置
export const darkThemeConfig = (theme: string): Store.CustomizeThemeConfig => (
    {
        theme: theme,
        fadedThemeColor: colorHexToRgb(theme, 0.1),
        mainTextColor: '#edf2f7',
        subTextColor: '#a0aec0',
        invertTextColor: '#edf2f7',
        hoverTextColor: '',
        mainBackgroundColor: '#0b0f19',
        subBackgroundColor: '#191e2c',
        invertBackgroundColor: '#191e2c',
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.09)',
        hoverInvertBackgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderColor: '#212B36',
        divider: 'rgb(45,55,72)',
        scrollColor: '#3a4651',
        themeShadow: colorHexToRgb(theme, 0.3),
        shadow: 'rgba(105,105,105,0.05)'
    }
)


export const naiveThemeConfig = (themeConfig: Store.CustomizeThemeConfig): GlobalThemeOverrides => {
    const lightenThemeColor = lightenColor(themeConfig.theme, 10)
    return {
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
            primaryColor: themeConfig.theme,
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
    }
}

// 系统主题色
export const systemThemes = [
    '#6675ff',
    '#E74C3C',
    '#8E44AD',
    '#3498DB',
    '#16A085',
    '#2ECC71',
    '#F1C40F',
    '#F39C12',
    '#D35400'
]
