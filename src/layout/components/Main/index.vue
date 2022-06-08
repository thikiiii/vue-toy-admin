<template>
  <n-button @click="test">切换</n-button>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'

const test = () => {
  useThemeStore().toggleTheme()
}
</script>

<style scoped>

</style>