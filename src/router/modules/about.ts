import { AppRouteRecordRaw } from '#/router'

const about: AppRouteRecordRaw = {
    path: '/about',
    name: 'About',
    meta: {
        title: '关于',
        // roles: [ RoleEnum.SUPER ],
        icon: 'lock',
        ignoreRoleAuth: true,
        keepAlive: true,
        orderNo: 3
    },
    component: () => import('@/views/about/index.vue')
}
export default about