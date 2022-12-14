<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import MixSideMenu from './mixSideMenu/index.vue'
import MixSideDrawer from './mixSideDrawer/index.vue'
import { reactive } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRouteStore } from '@/store/modules/route'
import { useLayoutStore } from '@/store/modules/layout'


interface State {
  // 二级菜单
  secondaryMenus: MenuOption[]
}

defineOptions({ name: 'MixSideMode' })
const routeStore = useRouteStore()
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const state: State = reactive({
  secondaryMenus: []
})

const handleMenu = (menu: Store.MenuOption) => {
  if (menu.children) {
    state.secondaryMenus = menu.children as MenuOption[]
    sidebar.mixedSidebarDrawerVisible = true
  } else {
    routeStore.handleClickMenu(menu.key)
    if (!sidebar.isFixedMixedSidebar) sidebar.mixedSidebarDrawerVisible = false
    state.secondaryMenus = []
    // isFixed.value = false
  }
}

</script>
<template>
  <div class="mixSideMode">
    <logo></logo>
    <div class="layoutSidebar-scroll">
      <mix-side-menu @handle-menu="handleMenu" />
    </div>
    <mix-side-drawer :menus="state.secondaryMenus" />
  </div>
</template>


<style lang="less" scoped>
.mixSideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: .2s ease-in-out;
  border-right: 1px solid @divider;
  position: relative;
}
</style>