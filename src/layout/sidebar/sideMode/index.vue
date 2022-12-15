<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'

defineOptions({ name: 'SideMode' })
const layoutStore = useLayoutStore()
const { sidebar, app } = layoutStore.$state
const routeStore = useRouteStore()

const sideModeClass = computed(() => sidebar.isCollapsedSidebar ? 'collapsed' : undefined)
</script>

<template>
  <transition name="full" appear>
    <div :class="sideModeClass" class="sideMode">
      <logo></logo>
      <div class="sideMode-scroll">
        <Menu
            v-if="app.menuMode==='Side'"
            :collapsed="sidebar.isCollapsedSidebar"
            :collapsed-width="sidebar.collapsedSidebarWidth"
            :menus="routeStore.menus"
            mode="Side"/>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.sideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: .2s ease-in-out;
  width: @sidebarWidth;
  border-right: 1px solid @divider;

  &.collapsed {
    width: @collapsedSidebarWidth;
  }

  &-scroll {
    flex: 1;
    overflow: auto;
  }
}

:global(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content__icon svg) {
  width: 24px;
  height: 24px;
}

.full-enter-active,
.full-leave-active {
  transition: .2s ease-in-out;
}

.full-enter-from,
.full-leave-to {
  width: 100%;
  opacity: 0;
  transform: scale(.95);
}
</style>