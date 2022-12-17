<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import SideMode from './sideMode/index.vue'
import MixSideMode from './mixSideMode/index.vue'
import MobileSidebar from './mobileSidebar/index.vue'
import { computed } from 'vue'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const {
  sidebar,
  app,
  mobile
} = layoutStore.$state


const sidebarClass = computed(() => {
  switch (app.menuMode) {
    case 'Side':
      return sidebar.isCollapsedSidebar ? 'collapsed' : undefined
    case 'MixSide':
      if (sidebar.isFixedMixedSidebar) {
        return sidebar.isCollapsedMixedSidebar ? 'mixSideCollapsedFixedWidth' : 'mixSideFixedWidth'
      }
      return sidebar.isCollapsedMixedSidebar ? 'collapsedMixSide' : 'mixSide'
    default :
      return undefined
  }
})

</script>

<template>
  <transition name="slideIn">
    <div
        v-if="app.menuMode!=='Top'&&!mobile.isMobile"
        :class="sidebarClass"
        class="layoutSidebar"
    >
      <side-mode v-if="app.menuMode==='Side'"/>
      <mix-side-mode v-if="app.menuMode==='MixSide'"/>
    </div>
  </transition>
  <mobile-sidebar v-if="mobile.isMobile"/>
</template>


<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  display: flex;
  flex-direction: column;
  transition: .2s ease-in-out;
  position: relative;
  z-index: 101;
  width: @sidebarWidth;

  &.inverted {
    background: @invertBackgroundColor;
  }

  &.collapsed {
    width: @collapsedSidebarWidth;
  }

  &.mixSide {
    width: @mixedSidebarWidth;
  }

  &.mixSide {
    width: @mixedSidebarWidth;
  }

  &.collapsedMixSide {
    width: @collapsedMixedSidebarWidth;
  }

  &.mixSideFixedWidth {
    width: calc(@mixedSidebarWidth + @sidebarWidth);
  }

  &.mixSideCollapsedFixedWidth {
    width: calc(@collapsedMixedSidebarWidth + @sidebarWidth);
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
  transform: scale(.95);
}
</style>