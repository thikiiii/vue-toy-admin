<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'

defineOptions({ name: 'SideMode' })
const layoutStore = useLayoutStore()
const { sidebar, app } = layoutStore.$state
const routeStore = useRouteStore()
</script>

<template>
  <div :style="{width:layoutStore.sideModeWidth}" class="sideMode">
    <logo></logo>
    <div class="sideMode-scroll">
      <Menu
          v-if="app.menuMode==='Side'"
          :collapsed="sidebar.isCollapsedSidebar"
          :collapsed-width="sidebar.collapsedWidth"
          :menus="routeStore.menus"
          mode="Side" />
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

  &-scroll {
    flex: 1;
    overflow: hidden;
  }
}

:global(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content__icon svg) {
  width: 24px;
  height: 24px;
}

</style>