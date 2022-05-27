import { ThemeType } from '@/store/modules/theme'
import { getSystemTheme, lighten } from '@/utils'
import ThemeStorage from '@/storage/theme'
import { GlobalThemeOverrides } from 'naive-ui'

// 默认主题颜色
export const DEFAULT_THEME = '#717ff9'

// 默认主题类型 (getSystemTheme 获取当前系统主题)
export const DEFAULT_THEME_TYPE: ThemeType = ThemeStorage.getTheme() || getSystemTheme()

// 减轻颜色
const lightenColor = lighten(DEFAULT_THEME, 6)

// 默认明亮主题配置
export const DEFAULT_LIGHT_THEME_CONFIG: GlobalThemeOverrides = {
    common: {
        primaryColor: DEFAULT_THEME,
        primaryColorHover: lightenColor,
        primaryColorPressed: lightenColor,
        primaryColorSuppl: lightenColor
    }
}

// 默认暗黑主题配置
export const DEFAULT_DARK_THEME_CONFIG: GlobalThemeOverrides = {
    common: {
        primaryColor: DEFAULT_THEME,
        primaryColorHover: lightenColor,
        primaryColorPressed: lightenColor,
        primaryColorSuppl: lightenColor
    }
}