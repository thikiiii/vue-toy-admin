import { NEllipsis } from 'naive-ui'
import { EllipsisProps } from 'naive-ui/es/ellipsis/src/Ellipsis'

export interface RenderEllipsisProps extends EllipsisProps {
  // 内容
  content?: string
}

// 字体省略
const useRenderEllipsis = () => (props: RenderEllipsisProps) => () => <NEllipsis {...props}>{props.content}</NEllipsis>

export default useRenderEllipsis
