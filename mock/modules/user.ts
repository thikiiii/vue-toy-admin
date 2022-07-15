export default [
    {
        url: '/mock/passwordLogin',
        method: 'post',
        // timeout: 5000,
        // statusCode: 400,
        response: () => {
            return {
                code: 200,
                subCode: 200,
                subMsg: '登录成功',
                token: 'by simple admin'
            }
        }
    },
    {
        url: '/mock/getUserinfo',
        method: 'get',
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
                    roles: [ 'Super' ],
                    // 用户信息
                    userinfo: {
                        userId: 1,
                        // 用户名
                        username: 'admin',
                        // 头像
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkfVMhgRPHf9mSpyfVGvJTX2-UP9B_5xFsyg&usqp=CAU'
                    }
                }
            }
        }
    },
    {
        url: '/mock/signOut',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                subCode: 200,
                subMsg: '成功'
            }
        }
    }
]