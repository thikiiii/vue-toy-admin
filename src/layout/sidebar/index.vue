<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { computed } from 'vue'
import SideMode from './sideMode/index.vue'
import MixSideMode from './mixSideMode/index.vue'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const {
  sidebar,
  app,
  mobile
} = layoutStore.$state

const width = computed(() => {
  switch (app.menuMode) {
    case 'Side':
      return sidebar.isCollapsedSidebar ? `${ sidebar.collapsedWidth }px` : sidebar.sidebarWidth
    case 'MixSide':
      return sidebar.isCollapsedMixedSidebar ? sidebar.collapsedMixedMenuWidth : sidebar.mixedMenuWidth
  }
})

const onMouseLeave = () => {
  // if (!sidebar.isFixedMixedSidebar) sidebar.
}
</script>

<template>
  <transition name="slideIn">
    <div v-if="app.menuMode!=='Top'||mobile.isMobile" :style="{width}" class="layoutSidebar" @mouseleave="onMouseLeave">
      <side-mode v-if="app.menuMode==='Side'"/>
      <mix-side-mode v-if="app.menuMode==='MixSide'"/>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  display: flex;
  flex-direction: column;
  transition: .3s;
  border-right: 1px solid @divider;
  position: relative;
  z-index: 101;

  &.inverted {
    background: @invertBackgroundColor;
  }

  :deep(&-scroll) {
    flex: 1;
    overflow: auto;
    position: relative;
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