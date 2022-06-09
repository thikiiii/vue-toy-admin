<template>
  <div class="tabBar">
    tabBar
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
</script>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  height: v-bind('layoutStore.tabBarHeight');
}
</style>