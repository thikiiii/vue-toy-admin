import { Layout } from '@/layout/index'
import { Router } from '/#/router'

// 公共、无需权限的路由
const publicRouter: Router.AppRouteRecordRaw[] = [
    {
        path: '/root',
        name: 'root',
        component: Layout,
        meta: {
            title: 'Root'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    }
]
export default publicRouter

