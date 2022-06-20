// 菜单模式 side 侧边菜单模式 top 顶部菜单模式
export type MenuMode = 'side' | 'top'

// 布局
export interface LayoutStore {
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