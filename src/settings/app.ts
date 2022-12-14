import { AppStorage } from '@/storage/app'

// setting 初始值
const appSettingsInitial: AppSettings = {
    theme: '#6675ff',
    themeMode: 'light',
    followSystem: true,
    sidebar: {
        // 侧边栏宽度
        sidebarWidth: '220px',

        // 折叠侧边栏的宽度
        collapsedWidth: 64,

        // 是否折叠侧边栏
        isCollapsedSidebar: false,

        // 是否折叠混合侧边栏
        isCollapsedMixedSidebar: false,

        // 是否固定混合侧边栏
        isFixedMixedSidebar: false,

        mixedSidebarDrawerVisible: false,
        
        // 混合菜单宽度
        mixedMenuWidth: '94px',

        // 混合菜单折叠宽度
        collapsedMixedMenuWidth: '64px'
    },

    header: {
        // 头部高度
        headerHeight: '56px',

        // 是否开启面包屑
        isBreadCrumbs: true,

        // 标签栏高度
        tabBarHeight: '44px',

        // 顶部菜单位置
        topMenuPosition: 'Left',

        // 标签栏可见
        tabBarVisible: true,

        // 是否固定头部和标签栏
        isFixedHeaderAndTabBar: true
    },

    footer: {
        // 底部高度
        footerHeight: '30px',

        // 底部可见
        footerVisible: true,

        // 固定底部
        isFixedFooter: true
    },
    app: {
        // 是否开启页面切换动画
        isPageStartAnimation: true,

        // 页面动画
        pageAnimationMode: '',

        // 顶部进度条
        topProgressBarVisible: true,

        // 菜单模式
        menuMode: 'MixSide',

        // 页面缓存
        isPageCache: true
    }
}

export const appSettings = AppStorage.getSettings() || appSettingsInitial
