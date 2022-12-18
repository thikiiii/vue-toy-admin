// 布局
import store from 'store2'

export class LayoutStorage {
    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // 设置菜单模式
    static setMenuMode = (menuMode: Store.LayoutMode) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): Store.LayoutMode | undefined => store.get(this.menuMode)
}

