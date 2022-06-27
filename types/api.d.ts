declare namespace Api {
    // 用户
    namespace User {
        // 密码登录请求
        interface PasswordLoginRequset {
            // 用户名
            username: string,
            // 密码
            password: string
        }
        
        // 密码登录响应
        interface PasswordLoginResponse {
            // 状态码
            code: string,
            // token
            token: string
        }
        
        // 用户信息
        interface Userinfo {
            userId: string | number
            // 用户名
            username: string
            // 头像
            avatar: string
        }
    }
}