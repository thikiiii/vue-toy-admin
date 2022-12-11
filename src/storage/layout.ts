// 布局
import store from 'store2'


export class LayoutStorage {
    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // 设置菜单模式
    static setMenuMode = (menuMode: Store.MenuMode) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): Store.MenuMode | undefined => store.get(this.menuMode)
}