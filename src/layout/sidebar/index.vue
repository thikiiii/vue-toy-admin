<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { computed } from 'vue'
import MobileSidebar from './mobileSidebar/index.vue'
import MixedSidebar from './mixedSidebar/index.vue'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const {
  sidebar,
  app,
  mobile
} = layoutStore.$state
const routeStore = useRouteStore()
const width = computed(() => sidebar.isCollapsedSidebar ? `${ sidebar.collapsedWidth }px` : sidebar.sidebarWidth)
</script>

<template>
  <transition name="slideIn">
    <div
        v-if="!mobile.isMobile&&app.menuMode==='Side'"
        :style="{width}"
        class="layoutSidebar ">
      <logo></logo>
      <div class="layoutSidebar-scroll">
        <Menu
            :collapsed="sidebar.isCollapsedSidebar"
            :collapsed-width="sidebar.collapsedWidth"
            :menus="routeStore.menus"
            mode="Side" />
      </div>
    </div>
  </transition>
  <!-- 移动端菜单 -->
  <mobile-sidebar v-if="mobile.isMobile" />
  <!--  混合菜单-->
  <mixed-sidebar v-if="!mobile.isMobile&&app.menuMode==='SideMix'" />
</template>

<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  display: flex;
  flex-direction: column;
  transition: .3s;
  border-right: 1px solid @divider;

  &.inverted {
    background: @invertBackgroundColor;
  }

  &-scroll {
    flex: 1;
    //height: 100px;
    overflow: auto;

    :deep(.n-menu.n-menu--collapsed .n-menu-item-content .n-menu-item-content__icon svg) {
      width: 24px;
      height: 24px;
    }
  }
}


.slideIn-enter-active,
.slideIn-leave-active {
  transition: .3s ease-in-out;
}

.slideIn-enter-from,
.slideIn-leave-to {
  margin-left: calc(0px - @sidebarWidth);
}
</style>