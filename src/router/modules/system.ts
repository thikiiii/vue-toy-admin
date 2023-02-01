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
            path: '/system/menu',
            name: 'system_menu',
            meta: {
                roles: [ RoleEnum.SUPER ],
                title: '菜单'
            },
            component: 'View'
        }
    ]
}
export default system
