import type { IconProps } from '@/components/Icon/index.vue'
import Icon from '@/components/Icon/index.vue'
import { VNodeChild } from 'vue'

// useRenderIcon的配置
type UseRenderIconConfig = Omit<IconProps, 'icon'>

// 渲染图标
const useRenderIcon = (defaultConfig: UseRenderIconConfig = {}) => {
    return (props: IconProps) => (): VNodeChild => <Icon {...Object.assign(defaultConfig, props)}></Icon>
}

export default useRenderIcon
