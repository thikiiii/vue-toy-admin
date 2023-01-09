import { serve } from '@/services/request'


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
        serve.post<Service.Result<null, UserApiResponse.PasswordLogin>>(this.passwordLoginUrl, data, {
            params: { test: 1 },
            ignoreRepeatRequest: true
        })

    // 获取用户信息
    static getUserinfo = () => serve.get<Service.Result<UserApiResponse.UserDetails>>(this.getUserinfoUrl)

    // 获取用户路由
    static getRoutes = () => serve.get<Service.Result<UserApiResponse.UserRoutes[]>>(this.getRoutesUrl)

    // 退出登录
    static signOut = () => serve.get<Service.Result<Service.Result>>(this.signOutUrl)
}
