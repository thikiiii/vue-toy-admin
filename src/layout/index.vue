<template>
  <n-layout position="absolute">
    <n-layout has-sider class="layout">
      <n-layout-sider width="200" inverted show-trigger="bar">
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
  </n-layout>
</template>

<script lang="ts" setup>
import { HeaderContent, Logo, MainContent, SidebarContent } from '@/layout/index'</script>

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