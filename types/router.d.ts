import 'vue-router'

declare module 'vue-router' {
    // 路由元数据
    interface RouteMeta {
        // 名称
        title: string

        // 登录的情况下，是否忽略角色权限
        ignoreRoleAuth?: boolean

        // 细粒度权限
        permissions?: import('@/enums/auth').PermissionEnum[]

        // 角色
        roles?: import('@/enums/auth').RoleEnum[]

        // 是否缓存
        keepAlive?: boolean

        // 是否固定在tab上
        affix?: boolean

        // tab上的图标
        icon?: string

        // 内部嵌套地址
        frameSrc?: string

        // 菜单排序，只对第一级有效
        orderNo?: number

        // 隐藏菜单
        hideMenu?: boolean
    }
}


declare type AppRouteRecordRaw =
    Omit<import('vue-router').RouteRecordRaw, 'component' | 'components' | 'children'>
    & {
    component?: import('vue').Component

    components?: import('vue-router').RawRouteComponent

    children?: AppRouteRecordRaw[]
}


declare type RouteType = 'Layout' | 'Menu'