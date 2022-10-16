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
                token: 'by Thik admin'
            }
        }
    },
    {
        url: '/mock/getUserinfo',
        method: 'get',
        // timeout: 5000,
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
    },
    {
        url: '/mock/getRoutes',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                data: [
                    {
                        path: '/system',
                        name: 'system',
                        component: 'Layout',
                        redirect: '/system/user',
                        meta: {
                            title: '系统管理',
                            icon: 'lock',
                            orderNo: 2
                        },
                        children: [
                            {
                                path: '/system/user',
                                name: '/system_user',
                                meta: {
                                    title: '用户'
                                },
                                component: '/system/user/User'
                            },
                            {
                                path: '/system/role',
                                name: 'system_role',
                                meta: {
                                    title: '角色'
                                },
                                component: '/system/role/index'
                            },
                            {
                                path: '/system/menu',
                                name: 'system_menu',
                                meta: {
                                    title: '菜单'
                                },
                                component: '/system/menu/index'
                            },
                            {
                                path: '/system/test',
                                name: '/system_test',
                                component: 'Layout',
                                meta: {
                                    title: '测试测试测试测试测试测试测试测试测试'
                                },
                                children: [
                                    {
                                        path: '/system/test/menu',
                                        name: 'system_test_menu',

                                        meta: {
                                            title: '测试菜单'
                                        },
                                        component: '/system/test/menu/index'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                subCode: 200,
                subMsg: '成功'
            }
        }
    }
]