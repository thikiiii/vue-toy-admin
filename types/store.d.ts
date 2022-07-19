declare namespace Store {
    // 布局 Store
    interface LayoutStore {
        // 折叠宽度
        collapsedWidth: number
        // 侧边栏是否折叠
        collapsed: boolean

        // 移动端触发宽度
        mobileTriggerWidth: number

        // 是否移动端
        isMobile: boolean

        // 移动端 menu 可见
        mobileMenuVisible: boolean

        // 菜单模式
        menuMode: MenuMode
    }


    // 自定义主题配置
    interface CustomizeThemeConfig {
        // 主题颜色
        theme: string

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
        divder: string

        // 滚动条
        scroll: string
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

    // 标签栏 Store
    interface TabBarStore {
        // 缓存白名单
        cacheWhiteList: string[],

        // 标签栏
        tabBar: TabBar[]

        // 激活
        active: string
    }

    // 标签栏
    interface TabBar extends Pick<import('vue-router').RouteMeta, 'title' | 'keepAlive'> {
        // 路由
        path: string,
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

    type MenuOption = import('naive-ui').MenuOption & {
        meta: import('vue-router').RouteMeta
    }

    // 路由 Store
    interface RouteStore {
        // 菜单
        menus: MenuOption[]
    }
}