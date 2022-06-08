import { AppRouteRecordRaw } from '@/router/types'
import { Layout } from '@/layout/index'

// 公共、无需权限的路由
const publicRouter: AppRouteRecordRaw[] = [
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
        component: ()=>import('@/views/login/index.vue')
    }
]
export default publicRouter

