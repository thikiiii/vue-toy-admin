import { LayoutStorage } from '@/storage/layout'
import { getSystemTheme } from '@/utils'
import { RouteAuthMode } from '@/enums/auth'
import { ThemeStorage } from '@/storage/theme'
import { MenuModeEnum } from '@/enums/layout'
// 全局配置
export default class Settings {
    // 路由鉴权模式
    static readonly routeAuthMode = RouteAuthMode.FRONT

    // 菜单模式
    static readonly menuMode = LayoutStorage.getMenuMode() || MenuModeEnum.SIDE

    // 主题模式
    static readonly themeMode = ThemeStorage.getTheme() || getSystemTheme()

    // 主题颜色
    static readonly theme = '#6675ff'

    // token 过期时间 （4小时后过期） 
    static readonly tokenExpirationTime = 1 / 24 * 4

    // root 有路由重定向路径
    static readonly homePath = '/dashboard'
}