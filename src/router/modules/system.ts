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
                    title: '角色'
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
            },
            {
                path: '/system/test',
                name: '/system_test',
                component: Layout,
                children: [
                    {
                        path: '/system/test/menu',
                        name: 'system_test_menu',
                        meta: {
                            title: '测试菜单'
                        },
                        component: () => import('@/views/system/menu/index.vue')
                    }
                ]
            }
        ]
    }
]
export default system