// 仪表盘
import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '../../layout/index'

const dashboard: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        redirect: '/dashboard/analysisPage',
        children: [
            {
                path: '/dashboard/analysisPage',
                name: 'dashboard_analysisPage',
                component: () => import('@/views/dashboard/analysisPage/index.vue')
            }
        ]
    }
]
export default dashboard