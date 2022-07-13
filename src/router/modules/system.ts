// 系统管理

import { Layout } from '@/layout/index'
import { RouteRecordRaw } from 'vue-router'

const system: RouteRecordRaw[] = [
    {
        path: '/system',
        name: 'system',
        component: Layout,
        redirect: '/system/user',
        children: [
            {
                path: '/system/user',
                name: '/system_user',
                meta: {
                    title: '用户'
                },
                component: () => import('@/views/system/user/User.vue')
            },
            {
                path: '/system/role',
                name: 'system_role',
                meta: {
                    title: '角色',
                    ignoreAuth: true
                },
                component: () => import('@/views/system/role/index.vue')
            },
            {
                path: '/system/menu',
                name: 'system_menu',
                meta: {
                    title: '菜单'
                },
                component: () => import('@/views/system/menu/index.vue')
            }
        ]
    }
]
export default system