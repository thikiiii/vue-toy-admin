// 布局
import store from 'store2'
import { MenuModeEnum } from '@/enums/settings'

export class LayoutStorage {
    // 菜单模式
    public static readonly menuMode = 'MENU_MODE'

    // 设置菜单模式
    static setMenuMode = (menuMode: MenuModeEnum) => store.set(this.menuMode, menuMode)

    // 获取菜单模式
    static getMenuMode = (): MenuModeEnum | undefined => store.get(this.menuMode)
}

