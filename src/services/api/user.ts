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
        serve.request<Service.Result<null, UserApiResponse.PasswordLogin>>({
            url: this.passwordLoginUrl,
            data
        })

    // 获取用户信息
    static getUserinfo = () => serve.request<Service.Result<UserApiResponse.UserDetails>>({ url: this.getUserinfoUrl })


    // 获取用户路由
    static getRoutes = () => serve.request<Service.Result<UserApiResponse.UserRoutes[]>>({ url: this.getRoutesUrl })

    // 退出登录
    static signOut = () => serve.request<Service.Result<Service.Result>>({ url: this.signOutUrl })
}
