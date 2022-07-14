import { Layout } from '@/layout/index'
import { RouteRecordRaw } from 'vue-router'
import Settings from '@/settings'

// 固定路由
const FixedRoute: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: Layout,
        redirect: Settings.homePath,
        meta: {
            title: 'Root'
        }
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
export default FixedRoute

