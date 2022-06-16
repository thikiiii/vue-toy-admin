// 渲染icon配置
import { Depth } from 'naive-ui/es/icon/src/Icon'
import Icon, { IconLibrary } from '@/components/Icon'

export interface RenderIconOption {
    // 图标名称
    icon: string
    // 颜色
    color?: string
    // 大小
    size?: string
    // 深度
    depth?: Depth
    // icon库
    library?: IconLibrary
}

const RenderIcon = ({ library = 'mdi', color, size, icon, depth }: RenderIconOption) =>
    <Icon library={ library }
          icon={ icon }
          size={ size }
          color={ color }
          depth={ depth } />
export default RenderIcon