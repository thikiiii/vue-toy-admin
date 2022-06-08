<template>
  <n-layout position="absolute">
    <n-layout has-sider class="layout">
      <n-layout-sider inverted show-trigger="bar">
        <logo />
        <sidebar-content />
      </n-layout-sider>
      <n-layout>
        <n-layout-header inverted class="layout-header">
          <header-content />
        </n-layout-header>
        <n-layout-content class="layout-main">
          <main-content />
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-layout-footer class="layout-footer">底部</n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import { HeaderContent, MainContent, SidebarContent,Logo } from '@/layout/index'


</script>

<style lang="less" scoped>
.layout {
  height: calc(100vh - @layout-footer-height);

  .layout-header {
    height: @layout-header-height;
    padding: 20px;
  }

  .layout-main {
    padding: 20px;
    height: calc(100% - @layout-header-height);
  }
}

.layout-footer {
  height: @layout-footer-height;
}
</style>