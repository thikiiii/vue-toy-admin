<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import SideMode from './sideMode/index.vue'
import MixSideMode from './mixSideMode/index.vue'
import { computed } from 'vue'
import { useSidebarStyle } from '@/layout/sidebar/hooks/useSidebar'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const {
  sidebar,
  app,
  mobile
} = layoutStore.$state

const { sideModeWidth, mixSideModeWidth, fixedMixSideModeWidth } = useSidebarStyle()


const sidebarWidth = computed(() => {
  switch (app.menuMode) {
    case 'Side':
      return sideModeWidth.value
    case 'MixSide':
      return sidebar.isFixedMixedSidebar ? fixedMixSideModeWidth.value : mixSideModeWidth.value
    default:
      return undefined
  }
})

</script>

<template>
  <transition name="slideIn">
    <div
        v-if="app.menuMode!=='Top'||mobile.isMobile"
        :style="{width:sidebarWidth}"
        class="layoutSidebar"
    >
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
  transition: .2s ease-in-out;
  position: relative;
  z-index: 101;

  &.inverted {
    background: @invertBackgroundColor;
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