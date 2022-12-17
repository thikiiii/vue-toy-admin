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
  const classList: string[] = []
  switch (app.menuMode) {
    case 'Side':
      sidebar.isCollapsedSidebar && classList.push('collapsed')
      break
    case 'MixSide':
      if (sidebar.isFixedMixedSidebar) {
        classList.push(sidebar.isCollapsedMixedSidebar ? 'mixSideCollapsedFixedWidth' : 'mixSideFixedWidth')
      } else {
        classList.push(sidebar.isCollapsedMixedSidebar ? 'collapsedMixSide' : 'mixSide')
      }
      break
  }
  if (sidebar.isInverted) classList.push('inverted')
  return classList.join(' ')
})

</script>

<template>
  <transition name="slideIn">
    <div
        v-if="app.menuMode!=='Top'&&!mobile.isMobile"
        :class="sidebarClass"
        class="layoutSidebar"
    >
      <transition-group name="full">
        <side-mode v-if="app.menuMode==='Side'" />
        <mix-side-mode v-if="app.menuMode==='MixSide'" />
      </transition-group>
    </div>
  </transition>
  <mobile-sidebar v-if="mobile.isMobile" />
</template>


<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  transition: .2s ease-in-out;
  position: relative;
  width: @sidebarWidth;
  color: @mainTextColor;

  &.inverted {
    background: @invertBackgroundColor;
    color: @invertTextColor;
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
  transition: .2s ease-in-out;
  overflow: hidden;
}

.slideIn-enter-from,
.slideIn-leave-to {
  width: 0 !important;
  opacity: 0;
}

.full-enter-active,
.full-leave-active {
  transition: .3s ease-in-out;
  position: absolute;
}

.full-enter-from,
.full-leave-to {
  width: 100%;
  opacity: 0;
  transform: scale(.95);
}

</style>