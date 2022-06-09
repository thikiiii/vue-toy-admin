// 布局
export interface LayoutStore {
    // 侧边栏宽度
    sidebarWidth: number
    // 侧边栏折叠宽度
    sidebarCollapsedWidth: number
    // 侧边栏是否折叠
    collapsed: boolean
    // 移动端触发宽度
    mobileTriggerWidth: number
}