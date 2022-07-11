import { LayoutStorage } from '@/storage/layout'
import { getSystemTheme } from '@/utils'
import { PermissionModeEnum } from '@/enums/auth'
import { ThemeStorage } from '@/storage/theme'
import { MenuModeEnum } from '@/enums/layout'
// 全局配置
export default class Settings {
    // 权限模式
    static readonly permissionMode = PermissionModeEnum.FROUNT
    // 菜单模式
    static readonly menuMode = LayoutStorage.getMenuMode() || MenuModeEnum.SIDE
    // 主题模式
    static readonly themeMode = ThemeStorage.getTheme() || getSystemTheme()
    // 主题颜色
    static readonly theme = '#6675ff'
}