<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import LayoutMenu from '@/layout/components/Menu/index.vue'
import LayoutHeader from '@/layout/components/Header/index.vue'
import LayoutMain from '@/layout/components/Main/index.vue'
import TabBar from '@/layout/components/TabBar/index.vue'
import Logo from '@/layout/components/Logo/index.vue'

const layoutStore = useLayoutStore()
const {
  collapsed,
  isMobile,
  mobileMenuVisible,
  menuMode,
  collapsedWidth
} = storeToRefs(layoutStore)

onMounted(() => {
  // 监听判断是否是移动端
  window.addEventListener('resize', layoutStore.judgeMobile)
})
onBeforeUnmount(() => {
  // 取消监听
  window.removeEventListener('resize', layoutStore.judgeMobile)
})
</script>

<template>
  <n-layout class="layout" has-sider position="absolute">
    <!-- PC 侧边栏 -->
    <n-layout-sider
        v-if="!isMobile && menuMode==='side'"
        :collapsed="collapsed"
        :collapsed-width="collapsedWidth"
        class="layout-sider"
        collapse-mode="width"
        show-trigger="bar"
        @collapse="layoutStore.setCollapsed(true)"
        @expand="layoutStore.setCollapsed(false)">
      <logo />
      <layout-menu :collapsed="collapsed" />
    </n-layout-sider>
    <!-- 移动端侧边栏 -->
    <n-modal v-model:show="mobileMenuVisible">
      <n-layout-sider class="layout-mobileMenu">
        <logo />
        <layout-menu inverted />
      </n-layout-sider>
    </n-modal>
    <n-layout>
      <!-- 头部 -->
      <n-layout-header class="layout-header">
        <layout-header />
      </n-layout-header>
      <tab-bar class="layout-tab-bar" />
      <!-- 内容 -->
      <n-layout-content class="layout-main">
        <layout-main />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.layout {
  height: 100vh;

  &-sider {
    border-right: 1px solid @divider;
    width: @layout-sidebal-width !important;
  }

  &-header {
    height: @layout-header-height;
    padding: 0 10px;
  }

  &-main {
    height: calc(100% - @layout-header-height - @layout-tab-bar-height);
    padding-bottom: 10px;
    overflow: hidden;
  }

  &-mobileMenu {
    height: 100vh;
    position: fixed;
    left: 0;
    width: @layout-sidebal-width !important;

    :deep(.n-layout-sider-scroll-container) {
      min-width: @layout-sidebal-width !important;
    }
  }
}
</style>