// 系统管理
import { RoleEnum } from '@/enums/auth'

const system: Route.RouteRecordRaw = {
    path: '/system',
    name: 'system',
    component: 'Layout',
    redirect: '/system/user',
    meta: {
        title: '系统管理',
        icon: 'mdi:alert-decagram-outline',
        orderNo: 2
    },
    children: [
        {
            path: '/system/user',
            name: 'system_user',
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
                roles: [ RoleEnum.SUPER ]
            },
            component: 'View'
        },
        {
            path: '/system/role1',
            name: 'system_role1',
            meta: {
                title: '角色1',
                roles: [ RoleEnum.SUPER ]
            },
            component: 'View'
        },
        {
            path: '/system/role2',
            name: 'system_role2',
            meta: {
                title: '角色2',
                roles: [ RoleEnum.SUPER ]
            },
            component: 'Layout',
            children: [ {
                path: '/system/role3',
                name: 'system_role3',
                meta: {
                    title: '角色3',
                    roles: [ RoleEnum.SUPER ]
                },
                component: 'View'
            },
            {
                path: '/system/role4',
                name: 'system_role4',
                meta: {
                    title: '角色4',
                    roles: [ RoleEnum.SUPER ]
                },
                component: 'View'
            } ]
        },
        {
            path: '/system/menu',
            name: 'system_menu',
            meta: {
                roles: [ RoleEnum.SUPER ],
                title: '菜单'
            },
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
                meta: {
                    title: '测试菜单',
                    roles: [ RoleEnum.SUPER ]
                },
                component: 'View'
            },
            {
                path: '/system/test/menu1',
                name: 'system_test_menu1',
                meta: {
                    title: '菜单',
                    roles: [ RoleEnum.SUPER ]
                },
                component: 'View'
            } ]
        }
    ]
}
export default system
