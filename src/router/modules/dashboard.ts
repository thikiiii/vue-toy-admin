// 仪表盘
import { RoleEnum } from '@/enums/auth'

const dashboard: Route.RouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: 'Layout',
    redirect: '/dashboard/analysis',
    meta: {
        title: '控制台',
        icon: 'lock',
        orderNo: 1
    },
    children: [
        {
            path: '/dashboard/analysis',
            name: 'dashboard_analysis',
            meta: {
                title: '分析页',
                roles: [ RoleEnum.SUPER ],
                keepAlive: true,
                affix: true
            },
            component: 'View'
        }
    ]
}
export default dashboard