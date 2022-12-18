<script lang="ts" setup>
import ContextMenu from '../components/ConfigMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'PageFunction' })
const layoutStore = useLayoutStore()
const { sidebar, header } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">页面功能</n-divider>
  <n-space vertical>
    <context-menu label="固定头部和多页签">
      <n-switch v-model:value="header.isFixedHeaderAndTabBar" />
    </context-menu>
    <context-menu label="头部反转色">
    </context-menu>
  </n-space>
</template>

<style lang="less" scoped>

</style>