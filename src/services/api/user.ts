import { serveRequest } from '@/services/request/handleRequest'


// 用户相关的Api
export abstract class UserApi {

    // 密码登录Url
    static passwordLoginUrl = '/mock/passwordLogin'

    // 获取用户信息Url
    static getUserinfoUrl = '/mock/getUserinfo'

    // 获取用户路由Url
    static getRoutesUrl = '/mock/getRoutes'

    // 退出登录Url
    static signOutUrl = '/mock/signOut'

    // 密码登录
    static passwordLogin = (data: UserApiRequest.PasswordLogin) =>
        serveRequest<null, UserApiResponse.PasswordLogin>({
            method: 'POST',
            url: this.passwordLoginUrl,
            data
        })

    // 获取用户信息
    static getUserinfo = () => serveRequest<UserApiResponse.UserDetails>({
        method: 'GET',
        url: this.getUserinfoUrl
    })

    // 获取用户路由
    static getRoutes = () => serveRequest<UserApiResponse.UserRoutes[]>({
        method: 'GET',
        url: this.getRoutesUrl
    })

    // 退出登录
    static signOut = () => serveRequest<Service.Result>({
        method: 'GET',
        url: this.signOutUrl
    })
}

