import { MockMethod } from 'vite-plugin-mock'

export default [ {
    url: '/mock/passwordLogin',
    method: 'post',
    timeout: 5000,
    // statusCode: 400,
    response: () => {
        return {
            code: 200,
            subCode: 200,
            subMsg: '登录成功',
            token: 'by Toy admin'
        }
    }
},
{
    url: '/mock/getUserinfo',
    method: 'get',
    // timeout: 5000,
    // statusCode: 500,
    response: () => {
        return {
            code: 200,
            msg: 'ok',
            subCode: 200,
            subMsg: '登录成功',
            result: {
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
    method: 'get',
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
    method: 'get',
    timeout: 0,
    response: () => {
        return {
            code: 200,
            msg: 'ok',
            roles: [ {
                path: '/system',
                name: 'system',
                component: 'Layout',
                redirect: '/system/user',
                meta: {
                    title: '系统管理',
                    icon: 'lock',
                    orderNo: 2
                },
                children: [ {
                    path: '/system/user',
                    name: 'system_user',
                    meta: { title: '用户' },
                    component: 'View'
                },
                {
                    path: '/system/role',
                    name: 'system_role',
                    meta: { title: '角色' },
                    component: 'View'
                },
                {
                    path: '/system/menu',
                    name: 'system_menu',
                    meta: { title: '菜单' },
                    component: 'View'
                },
                {
                    path: '/system/test',
                    name: 'system_test',
                    component: 'Layout',
                    meta: { title: '测试测试测试测试测试测试测试测试测试' },
                    children: [ {
                        path: '/system/test/menu',
                        name: 'system_test_menu',
                        meta: { title: '测试菜单' },
                        component: 'View'
                    } ]
                } ]
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: 'Layout',
                redirect: '/dashboard/analysis',
                meta: {
                    title: '控制台',
                    icon: 'lock',
                    orderNo: 1
                },
                children: [ {
                    path: '/dashboard/analysis',
                    name: 'dashboard_analysis',
                    meta: {
                        title: '分析页',
                        affix: true
                    },
                    component: 'View'
                } ]
            },
            {
                path: '/about',
                name: 'about',
                meta: {
                    title: '关于',
                    icon: 'lock',
                    keepAlive: true,
                    orderNo: 3
                },
                component: 'View'
            } ],
            subCode: 200,
            subMsg: '成功'
        }
    }
} ] as MockMethod[]
