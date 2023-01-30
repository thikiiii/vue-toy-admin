declare namespace Store {
    // 页面切换动画  左滑淡出 | 右滑淡出 | 缩放淡入淡出
    type PageAnimationMode =
        | 'left-slide-fade'
        | 'right-slide-fade'
        | 'zoom-fade'

    // 布局模式：侧边 | 混合侧边 | 顶部
    type LayoutMode = 'Side' | 'MixSide' | 'Top'

    // 布局风格 侧边暗黑 | 侧边顶部暗黑 | 侧边顶部明亮
    type LayoutStyle = 'SideDark' | 'SideTopDark' | 'SideTopLight'

    type Option<T> = {
        value: T
        label: string
    }

    // 布局模式选项
    type LayoutModeOption = Option<LayoutMode>

    // 布局风格选项
    type LayoutStyleOption = Option<LayoutStyle>

    // 布局风格选项
    type PageAnimationOption = Option<PageAnimationMode>

    // 侧边栏
    interface LayoutSidebar {
        // 侧边栏宽度
        sidebarWidth: number

        // 折叠侧边栏的宽度
        collapsedSidebarWidth: number

        // 是否折叠侧边栏
        isCollapsedSidebar: boolean

        // 是否折叠混合侧边栏
        isCollapsedMixedSidebar: boolean

        // 是否固定混合侧边栏
        isFixedMixedSidebar: boolean

        // 混合侧边栏抽屉是否可见
        mixedSidebarDrawerVisible: boolean

        // 混合侧边栏宽度
        mixedSidebarWidth: number

        // 混合菜单折叠宽度
        collapsedMixedSidebarWidth: number
    }

    // 头部
    interface LayoutHeader {
        // 头部高度
        headerHeight: number

        // 是否开启面包屑
        breadcrumbVisible: boolean

        // 标签栏高度
        tabBarHeight: number

        // 标签栏可见
        tabBarVisible: boolean

        // 是否固定头部和标签栏
        isFixedHeaderAndTabBar: boolean
    }

    interface LayoutFooter {
        // 底部高度
        footerHeight: number

        // 底部可见
        footerVisible: boolean

        // 固定底部
        isFixedFooter: boolean
    }

    // 移动端
    interface LayoutMobile {
        // 移动端触发宽度
        mobileTriggerWidth: number

        // 是否移动端
        isMobile: boolean

        // 移动端 menu 可见
        mobileMenuVisible: boolean
    }

    interface LayoutApp {
        // 是否开启页面切换动画
        isPageStartAnimation: boolean

        // 页面动画
        pageAnimationMode: PageAnimationMode

        // 布局模式
        layoutMode: LayoutMode

        // 布局风格
        layoutStyle: LayoutStyle
    }

    // 布局 Store
    interface LayoutStore {
        // 侧边栏
        sidebar: LayoutSidebar

        // 头部
        header: LayoutHeader

        // 底部
        footer: LayoutFooter

        // 移动端
        mobile: LayoutMobile

        // app
        app: LayoutApp
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

        // hover反转背景颜色
        hoverInvertBackgroundColor: string

        // 反转背景颜色
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

    // 主题模式: 明亮 | 暗黑
    type ThemeMode = 'light' | 'dark'

    type ThemeModeConfig<T> = {
        [themeMode in ThemeMode]: T
    }

    // 主题 state
    interface ThemeStore {
        // 主题颜色
        theme: string

        // 当前主题模式
        themeMode: ThemeMode

        // 跟随系统
        followSystem: boolean

        // naiveUi 主题
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
        roles: import('@/enums/auth').RoleEnum[]

        // 细粒度权限
        permissions: import('@/enums/auth').PermissionEnum[]

        // 用户信息
        userinfo: Nullable<UserService.Response.UserDetails['userinfo']>

        // 登录 loading
        loginLoading: boolean

        // 退出登录 loading
        signOutLoading: boolean
    }

    // TODO: 递归报错 Type instantiation is excessively deep and possibly infinite.
    type NMenuOption = import('naive-ui').MenuOption

    type MenuOption = NMenuOption & {
        meta?: import('vue-router').RouteMeta
        children?: MenuOption[]
    }

    // 路由 Store
    interface RouteStore {
        // 菜单
        menus: MenuOption[]

        // 路由鉴权模式
        routeAuthMode: import('@/enums/auth').RouteAuthModeEnum

        // 是否初始化过权限路由
        hasInitAuthRoute: boolean
    }
}
