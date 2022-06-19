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
    hoverTextColor: '',
    mainBackgroundColor: '#FFFFFF',
    subBackgroundColor: '#f9fafc',
    invertBackgroundColor: '#111827',
    hoverBackgroundColor: '',
    borderColor: '#212B36',
    divder: 'rgba(145,158,171,0.24)'
}

const darkThemeConfig: CustomizeThemeConfig = {
    theme: themeColor,
    mainTextColor: '#edf2f7',
    subTextColor: '#a0aec0',
    invertTextColor: '',
    hoverTextColor: '',
    mainBackgroundColor: '#0b0f19',
    subBackgroundColor: '#191e2c',
    invertBackgroundColor: '#222222',
    hoverBackgroundColor: '',
    borderColor: '#212B36',
    divder: 'rgb(45,55,72)'
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
                cardColor: lightThemeConfig.mainBackgroundColor,
                // 主内容背景
                bodyColor: lightThemeConfig.subBackgroundColor,
                // 模态框背景
                modalColor: lightThemeConfig.subBackgroundColor,
                // 反转背景
                invertedColor: lightThemeConfig.invertBackgroundColor,
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            },
            Card: {
                color: lightThemeConfig.mainBackgroundColor,
                borderRadius: '15px'
            }
        },
        dark: {
            common: {
                textColor1: 'red',
                // 主字体颜色
                textColor2: darkThemeConfig.mainTextColor,
                textColor3: darkThemeConfig.subTextColor,
                // 侧边栏、头部的背景
                cardColor: darkThemeConfig.subBackgroundColor,
                // 主内容背景
                bodyColor: darkThemeConfig.mainBackgroundColor,
                // 模态框背景
                modalColor: darkThemeConfig.subBackgroundColor,
                // 反转背景
                invertedColor: darkThemeConfig.invertBackgroundColor,
                primaryColor: themeColor,
                primaryColorHover: lightenColor,
                primaryColorPressed: lightenColor,
                primaryColorSuppl: lightenColor
            },
            Card: {
                color: darkThemeConfig.subBackgroundColor,
                borderRadius: '8px'
            }
        }
    }
}