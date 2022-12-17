<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import Menu from '@/layout/components/Menu/index.vue'
import { computed } from 'vue'
import { MenuOption } from 'naive-ui'

interface Props {
  menus: MenuOption[]
}

defineOptions({ name: 'MixSideDrawer' })
defineProps<Props>()

const layoutStore = useLayoutStore()
const { sidebar, header } = layoutStore.$state

const thumbtackIcon = computed(() => sidebar.isFixedMixedSidebar ? 'mdi:pin-off' : 'mdi:pin')
</script>

<template>
  <transition name="slideIn">
    <div v-if="sidebar.mixedSidebarDrawerVisible"  class="mixedMenuDrawer">
      <div class="mixedMenuDrawer-header">
        <h1/>
        <icon :icon="thumbtackIcon" pointer @click="layoutStore.toggleFixedMixedSidebar()"/>
      </div>
      <div class="mixedMenuDrawer-scroll" :style="{height:`${header.headerHeight}px`}">
        <Menu :menus="menus" mode="Side"/>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.mixedMenuDrawer {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  background: @subBackgroundColor;
  border-left: 1px solid @divider;
  border-right: 1px solid @divider;
  height: 100%;
  transform: translateX(100%);
  z-index: 100;
  overflow: hidden;
  width: @sidebarWidth;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
  }

  &-scroll {
    overflow: auto;
    flex: 1;
  }
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: .2s ease-out;
  overflow: hidden;
}

.slideIn-enter-from,
.slideIn-leave-to {
  width: 0 !important;
  opacity: 0;
}
</style>