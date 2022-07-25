import { RoleEnum } from '@/enums/auth'
import { AppRouteRecordRaw } from '#/router'

const about: AppRouteRecordRaw = {
    path: '/about',
    name: 'About',
    meta: {
        title: '关于',
        roles: [ RoleEnum.SUPER ],
        icon: 'lock',
        keepAlive: true,
        orderNo: 2
    },
    component: () => import('@/views/about/index.vue')
}
export default about