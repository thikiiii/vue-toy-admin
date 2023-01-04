import { axiosInstance } from '@/services/request'


// 用户相关的Api
export abstract class UserApi {
    // 密码登录
    static passwordLogin = (data: UserServiceRequest.PasswordLogin) =>
        axiosInstance.post<Service.ExpandBaseResult<undefined, UserServiceResponse.PasswordLogin>>('/mock/passwordLogin', data)

    // 获取用户信息
    static getUserinfo = () => axiosInstance.get<Service.BaseResponseResult<UserService.Response.UserDetails>>('/mock/getUserinfo')

    // 获取用户路由
    static getRoutes = () => axiosInstance.get<Service.BaseResponseResult<UserService.Response.UserRoutes[]>>('/mock/getRoutes')

    // 退出登录
    static signOut = () => axiosInstance.get<Service.BaseResponseResult>('/mock/signOut')
}
