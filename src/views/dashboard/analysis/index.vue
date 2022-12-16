<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'DashboardAnalysis' })
const layoutStore = useLayoutStore()
</script>

<template>
  <div class="card">
    <n-button type="primary" @click="layoutStore.sidebar.sidebarWidth = 300">测试</n-button>
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 100%;
  min-height: 100%;
  box-shadow: 3px 10px 5px @shadow;
}
</style>