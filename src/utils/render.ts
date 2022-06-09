import { NEllipsis, NIcon } from 'naive-ui'
import { icons as ep } from '@iconify-json/ant-design'
import { Depth } from 'naive-ui/es/icon/src/Icon'

// 渲染icon配置
export interface RenderIconOption {
    // 图标名称
    icon: string
    // 颜色
    color?: string
    // 大小
    size?: string
    // 深度
    depth?: Depth
}

// 渲染图标
export const renderIcon = ({ icon, color, size, depth }: RenderIconOption) => h(NIcon, {
    color,
    size,
    depth
}, () => h('svg', {
    innerHTML: ep.icons[icon].body,
    viewBox: '0 0 1024 1024'
}))

// 渲染ellipsis配置
export interface RenderEllipsisOption {
    // 内容
    content: string
    // 展开方式
    expandTrigger?: 'click',
    // 最大行数
    lineClamp?: number,
}

// 渲染 ellipsis
export const renderEllipsis = ({ expandTrigger, lineClamp, content }: RenderEllipsisOption) =>
    h(NEllipsis, { expandTrigger, lineClamp }, () => content)