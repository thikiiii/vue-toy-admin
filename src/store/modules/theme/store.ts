import { getSystemTheme, lighten } from '@/utils'

import { GlobalThemeOverrides } from 'naive-ui'
import { Store } from '/#/store'
import { StoreStorage } from '@/storage/store'

// 主题颜色
const themeColor = '#6675ff'
// 减轻颜色
const lightenColor = lighten(themeColor, 6)

const lightThemeConfig: Store.CustomizeThemeConfig = {
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

const darkThemeConfig: Store.CustomizeThemeConfig = {
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


const naiceConfg = (
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
        primaryColor: themeColor,
        primaryColorHover: lightenColor,
        primaryColorPressed: lightenColor,
        primaryColorSuppl: lightenColor
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

export const themeStore: Store.ThemeStore = {
    theme: themeColor,
    themeType: StoreStorage.getTheme() || getSystemTheme(),
    customize: {
        light: lightThemeConfig,
        dark: darkThemeConfig
    },
    naive: {
        light: naiceConfg(lightThemeConfig),
        dark: naiceConfg(darkThemeConfig)
    }
}