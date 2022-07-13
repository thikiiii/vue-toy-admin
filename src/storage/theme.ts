import store from 'store2'
import { ThemeModeEnum } from '@/enums/theme'

export class ThemeStorage {
    // 主题
    public static readonly themeMode = 'THEME_MODE'

    // 获取主题
    static getTheme = (): ThemeModeEnum | undefined => store.get(this.themeMode)

    // 设置主题
    static setTheme = (themeType: ThemeModeEnum) => store.set(this.themeMode, themeType)
}