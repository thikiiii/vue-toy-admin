<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'

defineOptions({ name: 'SideMode' })
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const routeStore = useRouteStore()
/*
* TODO: SideMode组件与MixSideMode组件的根元素与logo组件抽离到 Sidebar组件中
* TODO: 解决Menu组件 iconSize bug
* */
const sideModeClass = computed(() => sidebar.isCollapsedSidebar ? 'collapsed' : undefined)
</script>

<template>
  <div :class="sideModeClass" class="sideMode">
    <logo></logo>
    <div class="sideMode-scroll">
      <Menu
          :collapsed="sidebar.isCollapsedSidebar"
          :collapsed-icon-size="24"
          :collapsed-width="sidebar.collapsedSidebarWidth"
          :icon-size="50"
          :inverted="sidebar.isInverted"
          :options="routeStore.menus"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.sideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: .2s ease-in-out;
  border-right: 1px solid @divider;
  width: @sidebarWidth;

  &.collapsed {
    width: @collapsedSidebarWidth;
  }

  &-scroll {
    flex: 1;
    overflow: auto;
  }
}

//:global(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content__icon svg) {
//  width: 24px;
//  height: 24px;
//}


</style>