const about: Route.RouteRecordRaw = {
    path: '/about',
    name: 'about',
    meta: {
        title: '关于',
        // roles: [ RoleEnum.SUPER ],
        icon: 'lock',
        keepAlive: true,
        orderNo: 3
    },
    component: 'View'
}
export default about