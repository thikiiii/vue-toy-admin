declare namespace Api {
    // 基础响应
    interface BaseResponse {
        // 系统状态
        code: number
        // 系统状态信息
        msg: string
        // 业务code状态
        subCode: number
        // 业务状态信息
        subMsg: string
    }

    // 包装响应数据
    interface WrapperResponses<D> extends BaseResponse {
        data?: D
    }

    // 包装 Promise 响应数据
    type WrapperPromiseResponses<D> = Promise<WrapperResponses<D>>

    // 分页
    interface Pagination {
        // 页数
        page: number
        // 每页数量
        size: number
    }

    // 包装 接口请求分页
    type WrapperPageRequest<Q> = Pagination & Q

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