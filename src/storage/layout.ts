// 布局
import store from 'store'
import { MenuMode } from '@/store/modules/layout/type'

export class LayoutStorage {
    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // 设置菜单模式
    static setMenuMode = (menuMode: MenuMode) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): MenuMode => store.get(this.menuMode)
}