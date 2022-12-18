import { AppStorage } from '@/storage/app'


// setting 初始值
const appSettingsInitial: AppSettings = {
    theme: '#6675ff',
    themeMode: 'light',
    followSystem: true,
    sidebar: {
        // 侧边栏宽度
        sidebarWidth: 220,

        // 折叠侧边栏的宽度
        collapsedSidebarWidth: 64,

        // 是否折叠侧边栏
        isCollapsedSidebar: false,

        // 是否折叠混合侧边栏
        isCollapsedMixedSidebar: false,

        // 是否固定混合侧边栏
        isFixedMixedSidebar: false,

        mixedSidebarDrawerVisible: false,

        // 混合菜单宽度
        mixedSidebarWidth: 94,

        // 混合菜单折叠宽度
        collapsedMixedSidebarWidth: 64
    },

    header: {
        // 头部高度
        headerHeight: 56,

        // 是否开启面包屑
        isBreadCrumbs: true,

        // 标签栏高度
        tabBarHeight: 44,

        // 顶部菜单位置
        topMenuPosition: 'Left',

        // 标签栏可见
        tabBarVisible: true,

        // 是否固定头部和标签栏
        isFixedHeaderAndTabBar: true
    },

    footer: {
        // 底部高度
        footerHeight: 30,

        // 底部可见
        footerVisible: true,

        // 固定底部
        isFixedFooter: false
    },
    app: {
        // 是否开启页面切换动画
        isPageStartAnimation: true,

        // 页面动画
        pageAnimationMode: '',

        // 顶部进度条
        topProgressBarVisible: true,

        // 布局模式
        layoutMode: 'Side',

        // 布局风格
        layoutStyle: 'SideTopLight',

        // 页面缓存
        isPageCache: true
    }
}

const { sidebar } = appSettingsInitial
if (sidebar.isFixedMixedSidebar) {
    sidebar.mixedSidebarDrawerVisible = true
}

// 布局模式列表
export const layoutModeList: Store.LayoutModeOption[] = [
    {
        value: 'Side',
        label: '侧边菜单模式'
    },
    {
        value: 'MixSide',
        label: '侧边菜单混合模式'
    },
    {
        value: 'Top',
        label: '顶部菜单模式'
    }
]

// 布局风格列表
export const layoutStyleList: Store.LayoutStyleOption[] = [
    {
        value: 'SideDark',
        label: '侧边暗色风格'
    },
    {
        value: 'SideTopDark',
        label: '侧边+顶部暗色风格'
    },
    {
        value: 'SideTopLight',
        label: '侧边+顶部明亮风格'
    }
]

export const appSettings = appSettingsInitial || AppStorage.getSettings()
