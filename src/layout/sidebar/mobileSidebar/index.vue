<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'

defineOptions({ name: 'MobileSidebar' })
const layoutStore = useLayoutStore()
const { mobile } = layoutStore.$state
const routeStore = useRouteStore()
const className = computed(() => layoutStore.sideInverted ? 'inverted' : undefined)
</script>

<template>
  <n-drawer v-model:show="mobile.mobileMenuVisible" :class="className" class="mobileSidebar" placement="left">
    <logo />
    <Menu :inverted="layoutStore.sideInverted" :options="routeStore.menus" />
  </n-drawer>
</template>

<style lang="less" scoped>
:global(.mobileSidebar) {
  width: @sidebarWidth;
}

:global(.mobileSidebar.inverted) {
  background: @invertBackgroundColor;
  color: @invertTextColor;
}
</style>