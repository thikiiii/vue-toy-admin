import Settings from '@/settings'
import { AppRouteRecordRaw } from '#/router'

// 登录路由路径
export const LOGIN_PATH = '/login'

// 固定路由
export const fixedRoute: AppRouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: () => import('@/layout/index.vue'),
        redirect: Settings.homePath,
        children: []
    },
    {
        path: LOGIN_PATH,
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:NotFound(.*)*',
        name: 'NotFound',
        component: () => import('@/layout/index.vue'),
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