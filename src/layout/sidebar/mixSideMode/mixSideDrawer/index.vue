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

  const thumbtackIcon = computed(() => (sidebar.isFixedMixedSidebar ? 'mdi:pin-off' : 'mdi:pin'))
  const className = computed(() => (layoutStore.sideInverted ? 'inverted' : undefined))
</script>

<template>
  <transition name="slideIn">
    <div v-if="sidebar.mixedSidebarDrawerVisible" :class="className" class="mixedMenuDrawer">
      <div class="mixedMenuDrawer-header">
        <h1>sasdasda</h1>
        <icon :icon="thumbtackIcon" pointer @click="layoutStore.toggleFixedMixedSidebar()" />
      </div>
      <div :style="{ height: `${header.headerHeight}px` }" class="mixedMenuDrawer-scroll">
        <Menu :inverted="layoutStore.sideInverted" :options="menus" />
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
    border-right: 1px solid @divider;
    height: 100%;
    transform: translateX(100%);
    z-index: 100;
    overflow: hidden;
    width: @sidebarWidth;
    transition: 0.2s ease-in-out;

    &.inverted {
      background: @invertBackgroundColor;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      width: 100%;
      height: @headerHeight;
    }

    &-scroll {
      overflow: auto;
      flex: 1;
    }
  }

  .slideIn-enter-active,
  .slideIn-leave-active {
    transition: 0.2s ease-out;
    overflow: hidden;
  }

  .slideIn-enter-from,
  .slideIn-leave-to {
    width: 0 !important;
    opacity: 0;
  }
</style>
