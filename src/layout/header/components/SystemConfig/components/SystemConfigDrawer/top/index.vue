<script lang="ts" setup>
import ContextMenu from '../components/ConfigMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'Top' })
const layoutStore = useLayoutStore()
const { header } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">顶部</n-divider>
  <n-space vertical>
    <context-menu label="固定头部和多页签">
      <n-switch v-model:value="header.isFixedHeaderAndTabBar"/>
    </context-menu>
    <context-menu label="头部高度">
      <n-input-number size="small" step="10" v-model:value="header.headerHeight"/>
    </context-menu>
    <context-menu label="标签栏高度">
      <n-input-number size="small" step="10" v-model:value="header.tabBarHeight"/>
    </context-menu>
    <context-menu label="显示标签栏">
      <n-switch v-model:value="header.tabBarVisible"/>
    </context-menu>
    <context-menu label="显示面包屑">
      <n-switch v-model:value="header.breadcrumbVisible"/>
    </context-menu>
  </n-space>
</template>

<style scoped>

</style>