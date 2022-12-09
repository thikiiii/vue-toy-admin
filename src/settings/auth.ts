import { RouteAuthMode } from '@/enums/auth'

export class AuthSettings {
    // 路由鉴权模式
    static readonly routeAuthMode = RouteAuthMode.FRONT

    // token 过期时间
    static readonly tokenExpirationTime = 1 / 24 * 4  //（4小时后过期）
}