// 菜单模式 side 侧边菜单模式 top 顶部菜单模式
export type MenuMode = 'side' | 'top'

// 布局
export interface LayoutStore {
    // 头部高度
    headerHeight: string

    // 标签栏高度
    tabBarHeight: string

    // 侧边栏宽度
    sidebarWidth: number | string

    // 侧边栏折叠宽度
    sidebarCollapsedWidth: number

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