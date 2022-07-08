import axiosInstance from '@/services/request'

// 用户相关的Api
export class UserApi {
    // 密码登录
    static passwordLogin = (data: UserService.Request.PasswordLogin): Promise<Server.BaseResponse & UserService.Response.PasswordLogin> =>
        axiosInstance.post('/mock/passwordLogin', data)

    // 获取用户信息
    static getUserinfo = (): Server.WrapperPromiseResponses<UserService.Response.Userinfo> =>
        axiosInstance.get('/mock/getUserinfo')
}
