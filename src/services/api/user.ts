import axiosInstance from '@/services/request'

// 用户相关的Api
export class UserApi {
    // 密码登录
    static passwordLogin = (data: Api.User.PasswordLoginRequset): Promise<Api.BaseResponse & Api.User.PasswordLoginResponse> =>
        axiosInstance.post('/mock/passwordLogin', data)

    // 获取用户信息
    static getUserinfo = (): Api.WrappingPromiseResponses<Api.User.Userinfo> =>
        axiosInstance.get('/mock/getUserinfo')

}
