// 仪表盘
import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '../../layout/index'
import { RoleEnum } from '@/enums/auth'

const dashboard: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        redirect: '/dashboard/analysis',
        children: [
            {
                path: '/dashboard/analysis',
                name: 'dashboard_analysis',
                meta: {
                    title: '分析页',
                    roles: [ RoleEnum.SUPER ]
                },
                component: () => import('@/views/dashboard/analysis/index.vue')
            }
        ]
    }
]
export default dashboard