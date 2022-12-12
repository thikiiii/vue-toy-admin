<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import Avatar from './components/Avatar/index.vue'
import MenuCollapsed from './components/MenuCollapsed/index.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
import GlobalSearch from './components/AppSearch/index.vue'
import Github from './components/Github/index.vue'
import FullScreen from './components/FullScreen/index.vue'
import ThemeSwitch from './components/ThemeSwitch/index.vue'
import SystemConfig from './components/SystemConfig/index.vue'
import { computed } from 'vue'
import { useRouteStore } from '@/store/modules/route'

defineOptions({ name: 'LayoutHeader' })
const layoutStore = useLayoutStore()
const { header, app, mobile } = layoutStore.$state
const routeStore = useRouteStore()
const layoutHeaderClass = computed(() => header.isFixedHeaderAndTabBar ? 'fixed' : undefined)
</script>
<template>
  <div :class="layoutHeaderClass" class="layoutHeader inverted">
    <div class="layoutHeader-left">
      <template v-if="app.menuMode!=='Top'">
        <!-- 菜单折叠 -->
        <menu-collapsed v-if="mobile.isMobile||app.menuMode!=='SideMix'" />
        <!-- 面包屑 -->
        <breadcrumb v-if="!mobile.isMobile" :style="{marginLeft:app.menuMode==='SideMix'?'10px':undefined}" />
      </template>
      <template v-if="app.menuMode==='Top'&&!mobile.isMobile">
        <!-- LOGO -->
        <div class="layoutHeader-left-logo-container">
          <logo />
        </div>
        <!-- 水平菜单 -->
        <n-scrollbar x-scrollable>
          <Menu :menus="routeStore.menus" collapsed inverted mode="Top" />
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
      <system-config />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layoutHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: @headerHeight;
  border-bottom: 1px solid @divider;
  gap: 10px;
  background: @subBackgroundColor;
  flex-shrink: 0;

  &.inverted {
    background: @invertBackgroundColor;
    color: @invertTextColor;
  }

  &.fixed {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
  }

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
      width: @sidebarWidth;
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