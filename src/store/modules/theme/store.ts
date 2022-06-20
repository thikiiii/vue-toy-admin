import { CustomizeThemeConfig, ThemeStore } from '@/store/modules/theme/type'
import { getSystemTheme, lighten } from '@/utils'
import ThemeStorage from '@/storage/theme'

// 主题颜色
const themeColor = '#6675ff'
// 减轻颜色
const lightenColor = lighten(themeColor, 6)

const lightThemeConfig: CustomizeThemeConfig = {
    theme: themeColor,
    mainTextColor: '#121828',
    subTextColor: '#65748b',
    invertTextColor: '#d1d5db',
    hoverTextColor: '#d1d5db',
    mainBackgroundColor: '#f9fafc',
    subBackgroundColor: '#FFFFFF',
    invertBackgroundColor: '#111827',
    hoverBackgroundColor: '',
    borderColor: '#212B36',
    divder: 'rgba(145,158,171,0.24)',
    scroll: '#b4bcc3'
}

const darkThemeConfig: CustomizeThemeConfig = {
    theme: themeColor,
    mainTextColor: '#edf2f7',
    subTextColor: '#a0aec0',
    invertTextColor: '#d1d5db',
    hoverTextColor: '',
    mainBackgroundColor: '#0b0f19',
    subBackgroundColor: '#191e2c',
    invertBackgroundColor: '#191e2c',
    hoverBackgroundColor: '',
    borderColor: '#212B36',
    divder: 'rgb(45,55,72)',
    scroll: '#3a4651'
}


export const themeStore: ThemeStore = {
    theme: themeColor,
    themeType: ThemeStorage.getTheme() || getSystemTheme(),
    customize: {
        light: lightThemeConfig,
        dark: darkThemeConfig
    },
    naive: {
        light: {
            common: {
                // 主字体颜色
                textColor2: lightThemeConfig.mainTextColor,
                textColor3: lightThemeConfig.subTextColor,
                // 侧边栏、头部的背景
                cardColor: lightThemeConfig.subBackgroundColor,
                // 主内容背景
                bodyColor: lightThemeConfig.mainBackgroundColor,
                // 模态框背景
                modalColor: lightThemeConfig.subBackgroundColor,
                // 反转背景
                invertedColor: lightThemeConfig.invertBackgroundColor,
                // 弹出框背景
                popoverColor: lightThemeConfig.subBackgroundColor,
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            },
            Card: {
                color: lightThemeConfig.subBackgroundColor,
                borderRadius: '8px'
            },
            Menu: {
                // 菜单字体反转颜色
                itemTextColorInverted: lightThemeConfig.invertTextColor,
                // 菜单背景反转颜色
                colorInverted: lightThemeConfig.invertBackgroundColor
            }
        },
        dark: {
            common: {
                // 主字体颜色
                textColor2: darkThemeConfig.mainTextColor,
                // 副字体颜色
                textColor3: darkThemeConfig.subTextColor,
                // 侧边栏、头部的背景
                cardColor: darkThemeConfig.subBackgroundColor,
                // 主内容背景
                bodyColor: darkThemeConfig.mainBackgroundColor,
                // 模态框背景
                modalColor: darkThemeConfig.subBackgroundColor,
                // 反转背景
                invertedColor: darkThemeConfig.invertBackgroundColor,
                // 弹出框背景
                popoverColor: darkThemeConfig.subBackgroundColor,
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            },
            Card: {
                color: darkThemeConfig.subBackgroundColor,
                borderRadius: '8px'
            },
            Menu: {
                // 菜单字体反转颜色
                itemTextColorInverted: darkThemeConfig.invertTextColor,
                // 菜单背景反转颜色
                colorInverted: darkThemeConfig.invertBackgroundColor
            }
        }
    }
}