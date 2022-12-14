<template>
  <logo></logo>
  <div class="layoutSidebar-scroll">
    <Menu
        v-if="app.menuMode==='Side'"
        :collapsed="sidebar.isCollapsedSidebar"
        :collapsed-width="sidebar.collapsedWidth"
        :menus="routeStore.menus"
        mode="Side"/>
  </div>
</template>

<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'

const layoutStore = useLayoutStore()
const {
  sidebar,
  app
} = layoutStore.$state
const routeStore = useRouteStore()
</script>

<style lang="less" scoped>
:global(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content__icon svg) {
  width: 24px;
  height: 24px;
}
</style>