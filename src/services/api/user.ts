import request from '@/services/request'

// 用户相关的Api
export class UserApi {
    // 密码登录
    static passwordLogin = (data: Api.User.PasswordLoginRequset): Promise<Api.User.PasswordLoginResponse> =>
        request.post('/mock/passwordLogin', data)
    
    // 获取用户信息
    static getUserinfo = (): Promise<Api.User.Userinfo> =>
        request.get('/mock/getUserinfo')
}
