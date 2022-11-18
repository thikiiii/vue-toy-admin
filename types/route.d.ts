declare namespace Route {
    /**
     * 路由组件类型
     * Self 本身就是页面
     * Layout 带有布局的页面
     * View 菜单
     * */
    type RouteComponentType = 'Self' | 'Layout' | 'View'


    interface RouteRecordRaw extends Omit<import('vue-router').RouteRecordRaw, 'component' | 'components' | 'children' | 'name'> {
        // 组件类型
        component: RouteComponentType

        components?: never

        children?: RouteRecordRaw[]

        name: string
    }


    // 路由元数据
    interface Meta {
        // 名称
        title: string

        // 细粒度权限
        permissions?: import('@/enums/auth').PermissionEnum[]

        // 角色
        roles?: import('@/enums/auth').RoleEnum[]

        // 是否缓存
        keepAlive?: boolean

        // 是否固定在tab上
        affix?: boolean

        // 图标，只对目录和
        icon?: string

        // 内部嵌套地址
        frameSrc?: string

        // 菜单排序，只对第一级有效
        orderNo?: number

        // 隐藏菜单
        hideMenu?: boolean
    }
}
