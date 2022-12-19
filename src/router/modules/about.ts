const about: Route.RouteRecordRaw = {
    path: '/about',
    name: 'about',
    meta: {
        title: '关于',
        // roles: [ RoleEnum.SUPER ],
        icon: 'mdi:account-arrow-down-outline',
        keepAlive: true,
        orderNo: 3,
        affix: true,
    },
    component: 'View'
}
export default about