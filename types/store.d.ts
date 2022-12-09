declare namespace Store {
    // 布局 Store
    interface LayoutStore {
        //  css 变量
        cssVariable: {
            // 头部高度
            headerHeight: string

            // 侧边栏宽度
            sidebarWidth: string

            // 底部高度
            footerHeight: string

            // 标签栏高度
            tabBarHeight: string

            // 混合菜单宽度
            mixedMenuWidth: string

            // 混合菜单折叠宽度
            collapsedMixedMenuWidth: string
        }

        // 折叠侧边栏的宽度
        collapsedSidebarWidth: number

        // 顶部进度条
        topProgressBarVisible: boolean

        // 是否折叠侧边栏
        isCollapsedSidebar: boolean

        // 移动端触发宽度
        mobileTriggerWidth: number

        // 是否移动端
        isMobile: boolean

        // 移动端 menu 可见
        mobileMenuVisible: boolean

        // 底部可见
        footerVisible: boolean

        // 标签栏可见
        tabBarVisible: boolean

        // 菜单模式
        menuMode: import('@/enums/layout').MenuModeEnum

        // 是否固定头部和标签栏
        isFixedHeaderAndTabBar: boolean

        // 顶部菜单位置
        topMenuPosition: import('@/enums/theme').TopMenuPositionEnum

        // 是否开启标签栏
        isTabBar: boolean

        // 是否开启面包屑
        isBreadCrumbs: boolean

        // 页面缓存
        isPageCache: boolean

        // 固定底部
        isFixedFooter: boolean

        // 是否开启页面切换动画
        isPageSwitchAnimation: boolean

        // 页面动画
        pageAnimation: import('@/enums/theme').PageAnimationEnum
    }

    // 自定义主题配置
    interface CustomizeThemeConfig {
        // 主题颜色
        theme: string
        //  淡化的主题色
        fadedThemeColor: string

        // 主字体颜色
        mainTextColor: string

        // 副字体颜色
        subTextColor: string

        // hover字体颜色
        hoverTextColor: string

        // 反字体颜色
        invertTextColor: string

        // 背景颜色
        mainBackgroundColor: string

        // 副背景颜色
        subBackgroundColor: string

        // hover背景颜色
        hoverBackgroundColor: string

        // 反背景颜色
        invertBackgroundColor: string

        // 边框
        borderColor: string

        // 分割线
        divider: string

        // 滚动条
        scrollColor: string

        // 主题色阴影
        themeShadow: string

        // 阴影
        shadow: string
    }

    type ThemeModeConfig<T> = {
        [themeMode in import('@/enums/theme').ThemeModeEnum]: T
    }

    // 主题 state
    interface ThemeStore {
        // 主题颜色
        theme: string

        // 当前主题模式
        themeMode: import('@/enums/theme').ThemeModeEnum

        // naive 主题
        naive: ThemeModeConfig<import('naive-ui').GlobalThemeOverrides>

        // 自定义主题
        customize: ThemeModeConfig<CustomizeThemeConfig>
    }

    type TabBar = Pick<Route.RouteRecordRaw, 'path' | 'meta' | 'name'>

    // 标签栏 Store
    interface TabBarStore {
        // 标签栏
        tabBar: TabBar[]

        // 缓存菜单
        cacheMenus: string[]

        // 固定标签
        affixTabs: TabBar[]

        // 刷新
        mainVisible: boolean
    }

    // 鉴权 Store
    interface AuthStore {
        token: Nullable<string>

        // 角色
        roles: import('@/enums/auth').RoleEnum[],

        // 细粒度权限
        permissions: import('@/enums/auth').PermissionEnum[]

        // 用户信息
        userinfo: Nullable<UserService.Response.UserDetails['userinfo']>

        // 登录 loading
        loginLoading: boolean
    }

    interface MenuOption {
        meta?: import('vue-router').RouteMeta

        label: string | (() => import('vue').VNodeChild)

        icon?: (() => import('vue').VNodeChild)

        // 路由
        key: string

        children?: MenuOption[]
    }

    // 路由 Store
    interface RouteStore {
        // 菜单
        menus: MenuOption[]

        // 路由鉴权模式
        routeAuthMode: import('@/enums/auth').RouteAuthMode

        // 是否初始化过权限路由
        hasInitAuthRoute: boolean
    }
}