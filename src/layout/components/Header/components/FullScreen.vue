<script lang="ts" setup>
import { inject } from 'vue'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit } = useFullscreen()
const size = inject<string>('size')


</script>

<template>
    <icon v-if="!isFullscreen" :size="size" icon="arrow-expand-all" @click="enter" />
    <icon v-else :size="size" icon="arrow-collapse-all" @click="exit" />
</template>

<style scoped>

</style>