import { getSystemTheme } from '@/utils'
import { RouteAuthMode } from '@/enums/auth'
import { ThemeStorage } from '@/storage/theme'
// 系统设置
export default class AppSettings {
    // 路由鉴权模式
    static readonly routeAuthMode = RouteAuthMode.FRONT

    // 菜单模式
    // static readonly menuMode = || MenuModeEnum.SIDE

    // 主题模式
    static readonly themeMode = ThemeStorage.getTheme() || getSystemTheme()

    // 主题颜色
    static readonly theme = '#6675ff'

    // token 过期时间 
    static readonly tokenExpirationTime = 1 / 24 * 4  //（4小时后过期）

    // root 有路由重定向路径
    static readonly homePath = '/dashboard'
}