<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'

defineOptions({ name: 'MobileSidebar' })
const layoutStore = useLayoutStore()
const { mobile, sidebar } = layoutStore.$state
const routeStore = useRouteStore()
</script>

<template>
  <n-drawer v-model:show="mobile.mobileMenuVisible" :width="sidebar.sidebarWidth" placement="left">
    <logo />
    <Menu :options="routeStore.menus" mode="Side" />
  </n-drawer>
</template>

<style lang="less" scoped>

</style>