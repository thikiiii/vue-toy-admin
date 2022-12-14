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
      return layoutStore.sideModeWidth
    case 'MixSide':
      let width = sidebar.isCollapsedMixedSidebar ? sidebar.collapsedMixedMenuWidth : sidebar.mixedMenuWidth
      return sidebar.isFixedMixedSidebar ? `${ parseInt(width) + parseInt(sidebar.sidebarWidth) }px` : width
  }
})
const onMouseLeave = () => {
  if (!sidebar.isFixedMixedSidebar) sidebar.mixedSidebarDrawerVisible = false
}

</script>

<template>
  <div
      v-if="app.menuMode!=='Top'||mobile.isMobile"
      :style="{width}"
      class="layoutSidebar"
      @mouseleave="onMouseLeave">
    <side-mode v-if="app.menuMode==='Side'" />
    <mix-side-mode v-if="app.menuMode==='MixSide'" />
  </div>
</template>

<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  display: flex;
  flex-direction: column;
  transition: .2s ease-in-out;
  position: relative;
  z-index: 101;

  &.inverted {
    background: @invertBackgroundColor;
  }
}
</style>