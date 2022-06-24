<template>
    <NIcon
        :class="pointer ? 'cursor-pointer' : undefined"
        :color="color"
        :depth="depth"
        :size="size">
        <svg
            :viewBox="`0 0 ${ iconLibrary?.width } ${ iconLibrary?.height }`"
            v-html="iconLibrary?.icons[icon]?.body" />
    </NIcon>
</template>

<script lang="ts" setup>
import { Depth } from 'naive-ui/es/icon/src/Icon'
import { icons as mdi } from '@iconify-json/mdi'
import { toRefs } from 'vue'

export type IconLibrary = 'mdi' | string

// 图标库
const icons = {
    // https://icon-sets.iconify.design/mdi/
    // https://materialdesignicons.com/
    mdi
}

interface Props {
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
    pointer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    library: 'mdi',
    pointer: true
})
const { icon, color, size, depth } = toRefs(props)
const iconLibrary = icons[props.library]

</script>
