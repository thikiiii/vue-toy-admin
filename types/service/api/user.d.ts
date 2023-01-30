// 用户请求
declare namespace UserApiRequest {
    // 密码登录请求
    interface PasswordLogin {
        // 用户名
        username: string
        // 密码
        password: string
    }
}

// 用户响应
declare namespace UserApiResponse {
    // 密码登录响应
    interface PasswordLogin {
        // token
        token: string
    }

    // 用户详情
    interface UserDetails {
        // 权限
        permissions: import('@/enums/auth').PermissionEnum[]
        // 角色
        roles: import('@/enums/auth').RoleEnum[]
        // 用户信息
        userinfo: {
            userId: number
            // 用户名
            username: string
            // 头像
            avatar: string
        }
    }

    // 路由
    type UserRoutes = Route.RouteRecordRaw[]
}
