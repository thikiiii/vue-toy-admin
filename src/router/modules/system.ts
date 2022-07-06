// 系统管理

import { Layout } from '@/layout/index'
import { RouteRecordRaw } from 'vue-router'

const system: RouteRecordRaw[] = [
    {
        path: '/system',
        name: 'dashboard',
        component: Layout,
        children: [
            {
                path: '/system/user',
                name: '/system_user',
                component: () => import('@/views/system/user/index.vue')
            },
            {
                path: '/system/role',
                name: 'system_role',
                component: () => import('@/views/system/role/index.vue')
            },
            {
                path: '/system/menu',
                name: 'system_menu',
                component: () => import('@/views/system/menu/index.vue')
            }
        ]
    }
]
export default system