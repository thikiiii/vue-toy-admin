import { Layout } from '@/layout/index'
import type { RouteRecordRaw } from 'vue-router'
import Settings from '@/settings'

// 固定路由
export const fixedRoute: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: Layout,
        redirect: Settings.homePath,
        meta: {
            title: 'Root'
        },
        children: [
            {
                path: '/:pathMatch(.*)*',
                name: '404',
                component: () => import('@/views/404/index.vue'),
                meta: {
                    title: '404'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            ignoreAuth: true
        }
    },
    {
        path: '/:NotFound(.*)*',
        name: 'NotFound',
        component: Layout,
        children: [
            {
                path: '/:NotFound(.*)*',
                component: () => import('@/views/404/index.vue'),
                meta: {
                    title: '404'
                }
            }
        ]
    }
]


// 创建目录
export const createDirectory = (): RouteRecordRaw => ({
    path: '/',
    name: 'root',
    component: Layout,
    children: []
})