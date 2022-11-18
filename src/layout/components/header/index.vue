<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import LayoutMenu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import Avatar from './components/Avatar/index.vue'
import MenuCollapsed from './components/MenuCollapsed/index.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
import GlobalSearch from './components/AppSearch/index.vue'
import Github from './components/Github/index.vue'
import FullScreen from './components/FullScreen/index.vue'

const layoutStore = useLayoutStore()
</script>
<template>
  <div class="headerContent">
    <div class="headerContent-left">
      <template v-if="layoutStore.menuMode==='side'||layoutStore.isMobile">
        <!-- 菜单折叠 -->
        <menu-collapsed />
        <!-- 面包屑 -->
        <breadcrumb />
      </template>
      <template v-if="layoutStore.menuMode==='top'&&!layoutStore.isMobile">
        <!-- LOGO -->
        <div class="headerContent-left-logo-container">
          <logo />
        </div>
        <!-- 水平菜单 -->
        <n-scrollbar x-scrollable>
          <layout-menu collapsed mode="horizontal" />
        </n-scrollbar>
      </template>
    </div>
    <div class="headerContent-right">
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
    </div>
  </div>
</template>
<style lang="less" scoped>
.headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid @divider;
  gap: 10px;

  &-left, &-right {
    display: flex;
    gap: 20px;
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
    justify-content: flex-end;
  }
}

:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>