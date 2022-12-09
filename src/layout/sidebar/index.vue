<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { MenuModeEnum } from '@/enums/layout'
import { computed } from 'vue'
import MobileMenu from './mobileMenu/index.vue'
import MixedMenu from './mixedMenu/index.vue'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
const width = computed(() => layoutStore.isCollapsedSidebar ? `${ layoutStore.collapsedSidebarWidth }px` : layoutStore.cssVariable.sidebarWidth)
</script>

<template>
  <transition name="slideIn">
    <div
        v-if="!layoutStore.isMobile&&layoutStore.menuMode===MenuModeEnum.SIDE"
        :style="{width}"
        class="layoutSidebar">
      <logo></logo>
      <div class="layoutSidebar-scroll">
        <Menu
            :collapsed="layoutStore.isCollapsedSidebar"
            :collapsed-width="layoutStore.collapsedSidebarWidth"
            :menus="routeStore.menus"
            :mode="MenuModeEnum.SIDE" />
      </div>
    </div>
  </transition>
  <!-- 移动端菜单 -->
  <mobile-menu v-if="layoutStore.isMobile" />
  <!--  混合菜单-->
  <mixed-menu v-if="layoutStore.menuMode===MenuModeEnum.SIDE_MIX" />
</template>

<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  display: flex;
  flex-direction: column;
  transition: .3s;
  border-right: 1px solid @divider;

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