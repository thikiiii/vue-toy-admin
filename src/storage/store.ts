// 布局
import store from 'store'
import { Store } from '/#/store'

export class StoreStorage {
    // 主题 常量
    public static readonly themeType = 'THEME_TYPE'

    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // token
    public static readonly token = 'SIMPLE_TOKEN'

    // 设置菜单模式
    static setMenuMode = (menuMode: Store.MenuMode) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): Store.MenuMode => store.get(this.menuMode)

    // 获取主题
    static getTheme = (): Store.ThemeType | undefined => store.get(this.themeType)

    // 设置主题
    static setTheme = (themeType: Store.ThemeType) => store.set(this.themeType, themeType)

    // 获取 token
    static getToken = (): string | undefined => store.get(this.token)

    // 设置 token
    static setToken = (token: string) => store.set(this.token, token)

    // 删除 token
    static removeToken = () => store.remove(this.token)
}