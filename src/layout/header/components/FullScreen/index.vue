<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { computed } from 'vue'
import IconHoverContainer from '../IconHoverContainer/index.vue'

defineOptions({ name: 'FullScreen' })

const { isFullscreen, enter, exit } = useFullscreen()

const iconName = computed(() => isFullscreen.value ? 'ri:fullscreen-exit-fill' : 'ri:fullscreen-fill')
</script>

<template>
    <icon-hover-container
        content="全屏"
        @click="isFullscreen ? exit() : enter()"
    >
        <icon :icon="iconName" />
    </icon-hover-container>
</template>

<style scoped></style>
