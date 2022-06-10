<template>
  <div class="tabBar">
    tabBar
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'
const layoutStore = useLayoutStore()
const { tabBarHeight } = storeToRefs(layoutStore)
</script>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  height: v-bind(tabBarHeight);
}
</style>