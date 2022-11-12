<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit } = useFullscreen()


</script>

<template>
  <icon v-if="!isFullscreen" icon="arrow-expand-all" @click="enter" />
  <icon v-else icon="arrow-collapse-all" @click="exit" />
</template>

<style scoped>

</style>