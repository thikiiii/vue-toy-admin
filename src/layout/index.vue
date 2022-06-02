<template>
  <n-layout position="absolute">
    <n-layout has-sider class="layout">
      <n-layout-sider show-trigger="bar">菜单</n-layout-sider>
      <n-layout>
        <n-layout-header class="layout-header">头部</n-layout-header>
        <n-layout-content class="layout-main">
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
          <p>测试</p>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-layout-footer>底部</n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import { Sidebar } from '@/layout/components/Sidebar/index'


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
    //height: calc(100% - @layout-header-height);
    height: 100vh;
  }
}
</style>