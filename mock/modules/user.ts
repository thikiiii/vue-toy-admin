export default [
    {
        url: '/mock/passwordLogin',
        method: 'post',
        timeout: 5000,
        // statusCode: 400,
        response: () => {
            return {
                code: 400,
                subCode: 200,
                subMsg: '登录成功',
                token: 'by simple admin'
            }
        }
    },
    {
        url: '/mock/getUserinfo',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                subCode: 200,
                subMsg: '登录成功',
                data: {
                    // 权限
                    permissions: [],
                    // 角色
                    roles: [],
                    // 用户信息
                    info: {
                        userId: 1,
                        // 用户名
                        username: 'admin',
                        // 头像
                        avatar: ''
                    }
                }
            }
        }
    }
]