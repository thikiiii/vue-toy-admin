import { Layout } from '@/layout/index'
import { RouteRecordRaw } from 'vue-router'

// 公共、无需权限的路由
const publicRouter: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            ignoreAuth: true
        }
    }
]
export default publicRouter

