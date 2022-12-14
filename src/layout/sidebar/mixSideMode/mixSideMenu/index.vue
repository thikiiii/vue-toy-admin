<script lang="ts" setup>
import { useLayoutStore } from "@/store/modules/layout";
import { useRouteStore } from "@/store/modules/route";
import { useRoute } from "vue-router";

defineOptions({ name: 'MixedMenu' })

interface Emits {
  (e: 'handleMenu', menu: Store.MenuOption): void
}

const emits = defineEmits<Emits>();

const layoutStore = useLayoutStore();
const routeStore = useRouteStore();
const route = useRoute();
const { sidebar } = layoutStore.$state;


const isActive = (menu: Store.MenuOption) => {
  if (menu.key === route.path) return true
  return menu.children?.some(item => {
    if (item.key === route.path) return true
    if (item.children) return isActive(item)
  });
};
</script>

<template>
  <n-popover
      v-for="menu in routeStore.menus"
      :key="menu.key"
      :disabled="!sidebar.isCollapsedMixedSidebar"
      trigger="hover">
    <template #trigger>
      <div :class="isActive(menu) ? 'active':undefined" class="mixedMenuCard" @click=" emits('handleMenu', menu)">
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