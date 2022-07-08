// 用户
declare namespace UserService {

    namespace Request {
        // 密码登录请求
        interface PasswordLogin {
            // 用户名
            username: string,
            // 密码
            password: string
        }
    }

    namespace Response {
        // 密码登录响应
        interface PasswordLogin {
            // token
            token: string
        }

        // 用户信息
        interface Userinfo {
            // 权限
            permissions: string[]
            // 角色
            roles: string[]
            // 用户信息
            info: {
                userId: number
                // 用户名
                username: string
                // 头像
                avatar: string
            }
        }
    }

}