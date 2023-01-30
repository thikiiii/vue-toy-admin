<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'
import Logo from '@/layout/components/Logo/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'

defineOptions({ name: 'SideMode' })
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const routeStore = useRouteStore()

const sideModeClass = computed(() => sidebar.isCollapsedSidebar ? 'collapsed' : undefined)
</script>

<template>
    <div :class="sideModeClass" class="sideMode">
        <logo></logo>
        <div class="sideMode-scroll">
            <Menu
                :collapsed="sidebar.isCollapsedSidebar"
                :collapsed-icon-size="24"
                :collapsed-width="sidebar.collapsedSidebarWidth"
                :icon-size="22"
                :inverted="layoutStore.sideInverted"
                :options="routeStore.menus"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.sideMode {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  border-right: 1px solid @divider;
  width: @sidebarWidth;

  &.collapsed {
    width: @collapsedSidebarWidth;
  }

  &-scroll {
    flex: 1;
    overflow: auto;
  }
}
</style>
