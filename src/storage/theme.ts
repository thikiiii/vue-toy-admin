// 此文件用于操作 sessionStorage 和 localStorage
import store from 'store'
import { ThemeType } from '@/store/modules/theme/type'

// 主题
export default class ThemeStorage {
    // 主题 常量
    public static readonly TORAGE_THEME = 'THEME_TYPE'

    // 获取主题
    static getTheme = (): ThemeType | undefined => store.get(this.TORAGE_THEME)

    // 设置主题
    static setTheme = (themeType: ThemeType) => store.set(this.TORAGE_THEME, themeType)
}

