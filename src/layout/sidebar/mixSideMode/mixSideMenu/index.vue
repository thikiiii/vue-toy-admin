<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { useRouteStore } from '@/store/modules/route'
import { onMounted, watch } from 'vue'
import { useMixSide } from '@/layout/sidebar/mixSideMode/hooks/useMixSide'

defineOptions({ name: 'MixedMenu' })



interface Emits {
  (e: 'handleMenu', menu: Store.MenuOption): void
}

const emits = defineEmits<Emits>()

const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
const { state } = useMixSide()
const { sidebar } = layoutStore.$state

const handleMenu = (menu: Store.MenuOption, i: number) => {
  state.activeIndex = i
  emits('handleMenu', menu)
}

</script>

<template>
  <n-popover
      v-for="(menu,i) in routeStore.menus"
      :key="menu.key"
      :disabled="!sidebar.isCollapsedMixedSidebar"
      trigger="hover">
    <template #trigger>
      <div :class="state.activeIndex===i ? 'active':undefined" class="mixedMenuCard" @click=" handleMenu(menu,i)">
        <span><icon :icon="menu?.meta?.icon" size="24"/></span>
        <n-ellipsis v-if="!sidebar.isCollapsedMixedSidebar" class="mixedMenu-main-scroll-menu-name">
          {{ menu?.meta?.title }}
        </n-ellipsis>
      </div>
    </template>
    <span>{{ menu?.meta?.title }}</span>
  </n-popover>
</template>

<style lang="less" scoped>
.mixedMenuCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 3px;
  transition: .2s ease-in-out;

  &.active {
    color: @theme;
    background: @fadedThemeColor;
  }


  &:hover:not(.active) {
    background: @hoverBackgroundColor;
  }
}
</style>