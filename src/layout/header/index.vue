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
  const { app, mobile, header } = layoutStore.$state
  const routeStore = useRouteStore()
  const breadcrumbVisible = computed(
    () => header.breadcrumbVisible && !mobile.isMobile && app.layoutMode !== 'Top',
  )
  const className = computed(() => (layoutStore.topInverted ? 'inverted' : undefined))
</script>
<template>
  <div :class="className" class="layoutHeader">
    <div class="layoutHeader-left">
      <!-- 菜单折叠 -->
      <menu-collapsed v-if="mobile.isMobile || app.layoutMode === 'Side'" />
      <!-- 面包屑 -->
      <breadcrumb
        v-if="breadcrumbVisible"
        :style="{
          marginLeft: app.layoutMode === 'MixSide' ? '10px' : undefined,
        }"
      />
      <template v-if="app.layoutMode === 'Top' && !mobile.isMobile">
        <!-- LOGO -->
        <div class="layoutHeader-left-logo-container">
          <logo />
        </div>
        <!-- 水平菜单 -->
        <n-scrollbar x-scrollable>
          <Menu :inverted="layoutStore.topInverted" :options="routeStore.menus" mode="horizontal" />
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
    transition: 0.2s ease-in-out;
    &.inverted {
      background: @invertBackgroundColor;
      color: @invertTextColor;
    }

    &-left,
    &-right {
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
