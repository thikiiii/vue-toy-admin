import { RouteAuthModeEnum } from '@/enums/auth'

export class Settings {
    // 路由鉴权模式
    static readonly routeAuthMode = RouteAuthModeEnum.FRONT

    // token 过期时间
    static readonly tokenExpirationTime = 1 / 24 * 4  //（4小时后过期）

    // 首页路径
    static readonly homePath = '/dashboard'
}