<template>
  <n-layout has-sider class="layout" position="absolute">
    <n-layout-sider
      position="absolute"
      collapse-mode="width"
      :collapsed-width="sidebarCollapsedWidth"
      :width="sidebarWidth"
      :collapsed="collapsed"
      @collapse="layoutStore.setCollapsed(true)"
      @expand="layoutStore.setCollapsed(false)"
      show-trigger="bar">
      <logo />
      <sidebar-content />
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="layout-header">
        <header-content />
      </n-layout-header>
      <n-layout-content class="layout-main">
        <main-content />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { HeaderContent, Logo, MainContent, SidebarContent } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
const { sidebarCollapsedWidth, sidebarWidth, collapsed } = storeToRefs(layoutStore)
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;

  &-header {
    height: @layout-header-height;
    padding: 20px;
  }

  &-main {
    padding: 20px;
    height: calc(100% - @layout-header-height);
  }
}
</style>