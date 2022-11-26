// TODO: 报错原因：webstorm bug
import type { IconProps } from '@/components/Icon/index.vue'
import Icon from '@/components/Icon/index.vue'

// useRenderIcon的配置
type UseRenderIconConfig = Omit<IconProps, 'icon'>

// 渲染图标
const useRenderIcon = (config: UseRenderIconConfig = {}) => {
    return (props: IconProps) => () => <Icon { ...Object.assign(config, props) } ></Icon>
}

export default useRenderIcon