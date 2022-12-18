<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'

defineOptions({ name: 'MobileSidebar' })
const layoutStore = useLayoutStore()
const { mobile, sidebar } = layoutStore.$state
const routeStore = useRouteStore()
const className = computed(() => sidebar.isInverted ? 'inverted' : undefined)
</script>

<template>
  <n-drawer class="mobileSidebar" :class="className" v-model:show="mobile.mobileMenuVisible" placement="left">
    <logo/>
    <Menu :inverted="sidebar.isInverted" :options="routeStore.menus" mode="Side"/>
  </n-drawer>
</template>

<style lang="less" scoped>
:global(.mobileSidebar) {
  width: @sidebarWidth;
}
:global(.mobileSidebar.inverted){
  background: @invertBackgroundColor;
  color: @invertTextColor;
}
</style>