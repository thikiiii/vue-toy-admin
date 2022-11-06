// 系统管理
import { RoleEnum } from '@/enums/auth'


const system: Route.RouteRecordRaw = {
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
                title: '用户',
                roles: [ RoleEnum.SUPER ]
            },
            component: 'View'
        },
        {
            path: '/system/role',
            name: 'system_role',
            meta: {
                title: '角色',
                roles: [ RoleEnum.TEST ]
            },
            component: 'View'
        },
        {
            path: '/system/menu',
            name: 'system_menu',
            meta: {
                roles: [ RoleEnum.TEST ],
                title: '菜单'
            },
            component: 'View'
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
                        title: '测试菜单',
                        roles: [ RoleEnum.SUPER ]
                    },
                    component: 'View'
                }
            ]
        }
    ]
}
export default system