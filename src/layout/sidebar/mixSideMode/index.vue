<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import MixSideMenu from './mixSideMenu/index.vue'
import MixSideDrawer from './mixSideDrawer/index.vue'
import { useToggle } from '@vueuse/core'
import { reactive } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRouteStore } from '@/store/modules/route'
import { useLayoutStore } from '@/store/modules/layout'


interface State {
  // 二级菜单
  secondaryMenus: MenuOption[]
}


const [ visible ] = useToggle()
const routeStore = useRouteStore()
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const state: State = reactive({
  secondaryMenus: []
})

const handleMenu = (menu: Store.MenuOption) => {
  if (menu.children) {
    state.secondaryMenus = menu.children as MenuOption[]
    visible.value = true
  } else {
    routeStore.handleClickMenu(menu.key)
    if (!sidebar.isFixedMixedSidebar) visible.value = false
    state.secondaryMenus = []
    // isFixed.value = false
  }
}

</script>
<template>
  <logo></logo>
  <div class="layoutSidebar-scroll">
    <mix-side-menu @handle-menu="handleMenu"/>
  </div>
  <mix-side-drawer v-model:visible="visible" :menus="state.secondaryMenus"/>
</template>


<style scoped>

</style>