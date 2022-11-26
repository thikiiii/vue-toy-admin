<template>
  <!-- iconify 图标 -->
  <icon
      v-if="!localIcon"
      :color="color"
      :height="size"
      :icon="iconName"
      :style="{cursor:pointer? 'pointer':undefined}"
      :width="size"
      class="n-icon"
  />
  <!-- 本地图标 -->
  <svg
      v-else
      :height="size"
      :style="{cursor:pointer? 'pointer':undefined,color:color}"
      :width="size"
      aria-hidden="true"
      class="n-icon">
    <use :xlink:href="iconName" />
  </svg>

</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import useMetaEnv from '@/hooks/common/useMetaEnv'

// TODO: 报错原因：webstorm bug
export interface IconProps {
  // 图标地址：https://icones.js.org/collection/all
  // 图标名称 例如：mdi:account | mdi-account
  icon?: string

  // 本地图标
  localIcon?: string

  // 颜色
  color?: string

  // 大小
  size?: string | number

  // 指针
  pointer?: boolean
}

defineOptions({ name: 'Icon' })
const props = withDefaults(defineProps<IconProps>(), {
  mode: 'block',
  size: '18px',
  pointer: false
})

const metaEnv = useMetaEnv()
const iconName = computed(() => props.localIcon ? `#${ metaEnv.VITE_ICON_LOCAL_PREFIX }-${ props.localIcon }` : props.icon)
</script>