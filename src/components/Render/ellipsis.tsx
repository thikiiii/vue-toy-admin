import { NEllipsis } from 'naive-ui'

// 渲染ellipsis配置
export interface RenderEllipsisOption {
    // 内容
    content: string
    // 展开方式
    expandTrigger?: 'click',
    // 最大行数
    lineClamp?: number,
}

const RenderEllipsis = ({ expandTrigger, lineClamp, content }: RenderEllipsisOption) =>
    <NEllipsis expandTrigger={ expandTrigger } lineClamp={ lineClamp }>{ content }</NEllipsis>

export default RenderEllipsis