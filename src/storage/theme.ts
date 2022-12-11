import store from 'store2'

export class ThemeStorage {
    // 主题
    public static readonly themeMode = 'THEME_MODE'

    // 获取主题
    static getTheme = (): Store.ThemeMode | undefined => store.get(this.themeMode)

    // 设置主题
    static setTheme = (themeType: Store.ThemeMode) => store.set(this.themeMode, themeType)
}