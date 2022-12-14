<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import Menu from '@/layout/components/Menu/index.vue'
import { computed, ref, watch } from 'vue'
import { TransitionPresets, useTransition, useVModel } from '@vueuse/core'

interface Props {
  menus: Store.MenuOption[]
  visible: boolean
}

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

defineOptions({ name: 'MixSideDrawer' })
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const visible = useVModel(props, 'visible', emits)
const layoutStore = useLayoutStore()
const { sidebar, header } = layoutStore.$state
const sourceWidth = ref(0)
const width = useTransition(sourceWidth, {
  duration: 300,
  transition: TransitionPresets.easeInOutCubic
})
watch(visible, (value) => {
  sourceWidth.value = value ? parseInt(sidebar.sidebarWidth) : 0
})

const thumbtackIcon = computed(() => sidebar.isFixedMixedSidebar ? 'mdi:pin-off' : 'mdi:pin')
</script>

<template>
  <div :style="{width:`${width}px`}" class="mixedMenuDrawer">
    <div :style="{height:header.headerHeight,width:sidebar.sidebarWidth}" class="mixedMenuDrawer-header">
      <h1>toy admin</h1>
      <icon :icon="thumbtackIcon" pointer @click="layoutStore.toggleFixedMixedSidebar()"/>
    </div>
    <div :style="{width:sidebar.sidebarWidth}" class="mixedMenuDrawer-scroll">
      <Menu :menus="menus" mode="Side"></Menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mixedMenuDrawer {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  background: @subBackgroundColor;
  border-right: 1px solid @divider;
  height: 100%;
  transform: translateX(100%);
  z-index: 100;
  overflow: hidden;

  &-header {
    display: flex;
    align-items: center;
  }

  &-scroll {
    overflow: auto;
  }
}

</style>