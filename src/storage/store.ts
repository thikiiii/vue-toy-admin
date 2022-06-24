// 布局
import store from 'store'
import { Store } from '/#/store'

export class StoreStorage {
    // 主题 常量
    public static readonly themeType = 'THEME_TYPE'

    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // 设置菜单模式
    static setMenuMode = (menuMode: Store.MenuMode) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): Store.MenuMode => store.get(this.menuMode)

    // 获取主题
    static getTheme = (): Store.ThemeType | undefined => store.get(this.themeType)

    // 设置主题
    static setTheme = (themeType: Store.ThemeType) => store.set(this.themeType, themeType)
}