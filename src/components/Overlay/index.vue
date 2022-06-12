<template>
    <teleport :to="props.to">
        <transition name="slide-fade" appear>
            <div v-if="show" class="overlay" @click.self="closable">
                <slot />
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
interface Props {
    // 是否显示
    show?: boolean
    // 渲染位置
    to?: string | HTMLElement
    // 点击遮罩层关闭
    overlayClosable?: boolean
}

interface Emits {
    (e: 'update:show', show: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
    show: false,
    to: 'body',
    overlayClosable: true
})
const emits = defineEmits<Emits>()
const closable = () => {
    if (props.overlayClosable) emits('update:show', !props.show)
}
</script>

<style lang="less" scoped>
.overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    left: 0;
    top: 0;
    position: absolute;
    z-index: 10;
}
</style>