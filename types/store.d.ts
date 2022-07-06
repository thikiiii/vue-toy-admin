import { GlobalThemeOverrides } from 'naive-ui'
import { Nullable } from '/#/global'
import { RouteMeta, RouteRecordRaw } from 'vue-router'

declare namespace Store {
    // 菜单模式 side 侧边菜单模式 top 顶部菜单模式
    type MenuMode = 'side' | 'top'

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


    // 主题类型
    type ThemeType = 'light' | 'dark'

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

    type ThemeTypeConfig<T> = {
        [themeType in ThemeType]: T
    }

    // 主题 state
    interface ThemeStore {
        // 主题颜色
        theme: string
        // 当前主题类型
        themeType: ThemeType
        // naive 主题
        naive: ThemeTypeConfig<GlobalThemeOverrides>
        // 自定义主题
        customize: ThemeTypeConfig<CustomizeThemeConfig>
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
    interface TabBar extends Pick<RouteMeta, 'title' | 'keepAlive'> {
        // 路由
        path: string,
    }

    // 用户 Store
    interface UserStore {
        token: Nullable<string>
        // 用户信息
        userinfo: Nullable<Pick<Api.User.Userinfo, 'info'>>
        // 登录 loading
        loginLoading: boolean
        // 菜单
        menu: RouteRecordRaw[]
    }

    // 权限 Store
    interface PermissionStore {
        // 权限路由
        authRouter: RouteRecordRaw[]
        // 公共路由
        publicRouter: RouteRecordRaw[]
    }
}