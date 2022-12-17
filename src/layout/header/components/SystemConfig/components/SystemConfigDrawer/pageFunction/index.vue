<script lang="ts" setup>
import ContextMenu from '../components/ConfigMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'PageFunction' })
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">页面功能</n-divider>
  <n-space vertical>
    <context-menu label="侧边栏反正色">
      <n-switch v-model:value="sidebar.isInverted" />
    </context-menu>
  </n-space>
</template>

<style lang="less" scoped>

</style>