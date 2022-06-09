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
}