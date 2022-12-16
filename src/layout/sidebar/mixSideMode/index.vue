<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import MixSideMenu from './mixSideMenu/index.vue'
import MixSideDrawer from './mixSideDrawer/index.vue'
import { computed } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRouteStore } from '@/store/modules/route'
import { useLayoutStore } from '@/store/modules/layout'
import { useMixSide } from '@/layout/sidebar/mixSideMode/hooks/useMixSide'
import { useSidebarStyle } from '@/layout/sidebar/hooks/useSidebar'

defineOptions({ name: 'MixSideMode' })
const routeStore = useRouteStore()
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const { state } = useMixSide()
const { mixSideModeWidth } = useSidebarStyle()
const collapsedIcon = computed(() => sidebar.isCollapsedMixedSidebar ? 'mdi:chevron-triple-right' : 'mdi:chevron-triple-left')

const handleMenu = (menu: Store.MenuOption) => {
  if (menu.children) {
    state.secondaryMenus = menu.children as MenuOption[]
    sidebar.mixedSidebarDrawerVisible = true
  } else {
    routeStore.handleClickMenu(menu.key)
    if (!sidebar.isFixedMixedSidebar) sidebar.mixedSidebarDrawerVisible = false
    state.secondaryMenus = []
  }
}

const onMouseLeave = () => {
  state.isLeave = true
  if (!sidebar.isFixedMixedSidebar) sidebar.mixedSidebarDrawerVisible = false
}

</script>
<template>
  <transition :name="sidebar.isFixedMixedSidebar?'fixed':'full'" appear>
    <div @mouseleave="onMouseLeave" @mouseenter="state.isLeave=false" :style="{width:mixSideModeWidth}"
         class="mixSideMode">
      <logo></logo>
      <div class="mixSideMode-scroll">
        <mix-side-menu @handle-menu="handleMenu"/>
      </div>
      <div @click="layoutStore.toggleCollapsedMixedSidebar()" class="mixSideMode-collapsed">
        <icon :icon="collapsedIcon" pointer size="22"/>
      </div>
      <mix-side-drawer :menus="state.secondaryMenus"/>
    </div>
  </transition>
</template>


<style lang="less" scoped>
.mixSideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: .2s ease-in-out;
  align-items: center;
  position: relative;
  border-right: 1px solid @divider;

  &-scroll {
    flex: 1;
    overflow: auto;
  }

  &-collapsed {
    height: @footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .2s ease-in-out;
    width: 100%;

    &:hover {
      color: @theme;
    }
  }
}

.fixed-enter-active,
.fixed-leave-active {
  transition: .2s ease-in-out;
}

.fixed-enter-from,
.fixed-leave-to {
  opacity: .5;
  transform: scale(.9);
}

.full-enter-active,
.full-leave-active {
  transition: .2s ease-in-out;
}

.full-enter-from,
.full-leave-to {
  width: 100% !important;
  opacity: 0;
  transform: scale(.9);
}

</style>