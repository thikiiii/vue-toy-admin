<script lang="ts" setup>
import Logo from '@/layout/Logo/index.vue'
import LayoutMenu from '@/layout/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import Avatar from './Avatar/index.vue'
import MenuCollapsed from './MenuCollapsed/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
import GlobalSearch from './AppSearch/index.vue'
import Github from './Github/index.vue'
import FullScreen from './FullScreen/index.vue'
import ThemeSwitch from './ThemeSwitch/index.vue'
import Settings from './Settings/index.vue'

const layoutStore = useLayoutStore()
</script>
<template>
  <div class="layoutHeader">
    <div class="layoutHeader-left">
      <template v-if="layoutStore.menuMode==='side'||layoutStore.isMobile">
        <!-- 菜单折叠 -->
        <menu-collapsed />
        <!-- 面包屑 -->
        <breadcrumb />
      </template>
      <template v-if="layoutStore.menuMode==='top'&&!layoutStore.isMobile">
        <!-- LOGO -->
        <div class="layoutHeader-left-logo-container">
          <logo />
        </div>
        <!-- 水平菜单 -->
        <n-scrollbar x-scrollable>
          <layout-menu collapsed mode="horizontal" />
        </n-scrollbar>
      </template>
    </div>
    <div class="layoutHeader-right">
      <!-- 搜索 -->
      <global-search />
      <!-- GITHUB -->
      <github />
      <!-- 全屏 -->
      <full-screen />
      <!-- 主题切换 -->
      <theme-switch />
      <!-- 头像和昵称 -->
      <avatar />
      <!-- 设置 -->
      <settings />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layoutHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid @divider;
  gap: 10px;

  &-left, &-right {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &-left {
    flex: 1;
    overflow: hidden;
    height: 100%;

    &-logo-container {
      height: 100%;
      width: @layout-sidebal-width;
      flex-shrink: 0;
    }

    :deep(.n-scrollbar-content) {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-horizontalMenu {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  &-right {
    height: 100%;
    justify-content: flex-end;
  }
}

:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>