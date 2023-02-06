<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import MixSideMenu from './mixSideMenu/index.vue'
import MixSideDrawer from './mixSideDrawer/index.vue'
import { computed } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRouteStore } from '@/store/modules/route'
import { useLayoutStore } from '@/store/modules/layout'
import { useMixSide } from '@/layout/sidebar/mixSideMode/hooks/useMixSide'

defineOptions({ name: 'MixSideMode' })
const routeStore = useRouteStore()
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const { state } = useMixSide()
const collapsedIcon = computed(() => sidebar.isCollapsedMixedSidebar ? 'mdi:chevron-triple-right' : 'mdi:chevron-triple-left')
const mixSideModeClass = computed(() => sidebar.isCollapsedMixedSidebar ? 'collapsed' : undefined)
const handleMenu = (menu: Store.MenuOption) => {
    if (menu.children) {
        state.secondaryMenus = menu.children as MenuOption[]
        sidebar.mixedSidebarDrawerVisible = true
    } else {
        routeStore.handleClickMenu(menu.key as string)
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
  <div
    :class="mixSideModeClass"
    class="mixSideMode"
    @mouseenter="state.isLeave = false"
    @mouseleave="onMouseLeave"
  >
    <logo />
    <div class="mixSideMode-scroll">
      <mix-side-menu @handle-menu="handleMenu" />
    </div>
    <div
      class="mixSideMode-collapsed"
      @click="layoutStore.toggleCollapsedMixedSidebar()"
    >
      <icon :icon="collapsedIcon" pointer size="22" />
    </div>
    <mix-side-drawer :menus="state.secondaryMenus" />
  </div>
</template>

<style lang="less" scoped>
.mixSideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.2s ease-in-out;
  align-items: center;
  position: relative;
  border-right: 1px solid @divider;
  width: @mixedSidebarWidth;

  &.collapsed {
    width: @collapsedMixedSidebarWidth;
  }

  &-scroll {
    flex: 1;
    overflow: auto;
    width: 100%;
  }

  &-collapsed {
    height: @footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    width: 100%;

    &:hover {
      color: @theme;
    }
  }
}
</style>
