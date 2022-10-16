// 仪表盘
import { RoleEnum } from '@/enums/auth'
import { AppRouteRecordRaw } from '#/router'

const dashboard: AppRouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard/analysis',
    meta: {
        title: '控制台',
        icon: 'lock',
        orderNo: 1,
        ignoreRoleAuth: true
    },
    children: [
        {
            path: '/dashboard/analysis',
            name: 'dashboard_analysis',
            meta: {
                title: '分析页',
                roles: [ RoleEnum.SUPER ],
                affix: true,
                ignoreRoleAuth: true
            },
            component: () => import('@/views/dashboard/analysis/index.vue')
        }
    ]
}
export default dashboard