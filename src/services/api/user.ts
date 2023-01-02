import axiosInstance from '@/services/request'


// 用户相关的Api
export class UserApi {
    // 密码登录
    static passwordLogin = (data: UserService.Request.PasswordLogin): Promise<Service.BaseResponse & UserService.Response.PasswordLogin> =>
        axiosInstance.post('/mock/passwordLogin', data)

    // 获取用户信息
    static getUserinfo = (): Service.WrapperPromiseResponses<UserService.Response.UserDetails> => axiosInstance.get('/mock/getUserinfo')

    // 获取用户路由
    static getRoutes = (): Service.WrapperPromiseResponses<UserService.Response.UserRoutes[]> =>
        axiosInstance.get('/mock/getRoutes', {})

    // 退出登录
    static signOut = (): Promise<Service.BaseResponse> =>
        axiosInstance.get('/mock/signOut')
}

