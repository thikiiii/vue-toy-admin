<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { MenuModeEnum } from '@/enums/layout'

defineOptions({ name: 'MobileMenu' })
console.log(1)
const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
</script>

<template>
  <n-drawer v-model:show="layoutStore.mobileMenuVisible" :width="layoutStore.cssVariable.sidebarWidth" placement="left">
    <logo />
    <Menu :menus="routeStore.menus" :mode="MenuModeEnum.SIDE" />
  </n-drawer>
</template>

<style lang="less" scoped>
:global(.n-menu .n-menu-item-content .n-menu-item-content__icon) {
  width: 24px;
  height: 24px;
}
</style>