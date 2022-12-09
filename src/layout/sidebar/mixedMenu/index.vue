<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useRouteStore } from '@/store/modules/route'
import { computed, reactive } from 'vue'
import { MenuModeEnum } from '@/enums/layout'
import { useToggle } from '@vueuse/core'
import { RouterHelpers } from '@/router/helpers'
import { useRoute } from 'vue-router'

interface State {
  // 二级菜单
  secondaryMenus: Store.MenuOption[]
  // 当前点击的 index
  currentIndex: number | undefined
}

defineOptions({ name: 'MixedMenu' })

const routeStore = useRouteStore()
const [ sidebarVisible ] = useToggle()
const [ isFixed, toggleFixed ] = useToggle()
const [ isCollapsed, toggleCollapsed ] = useToggle()
const route = useRoute()
const state: State = reactive({
  secondaryMenus: [],
  currentIndex: undefined
})

const mixedMenuClass = computed(() => {
  const className: string[] = []

  if (isFixed.value) className.push(isCollapsed.value ? 'collapsedExtend' : 'extend')
  if (isCollapsed.value && !isFixed.value) className.push('collapsed')
  return className.join(' ')
})

const collapsedClass = computed(() => isCollapsed.value ? 'collapsed' : undefined)
const thumbtackIcon = computed(() => isFixed.value ? 'mdi:pin-off' : 'mdi:pin')
const collapsedIcon = computed(() => isCollapsed.value ? 'mdi:chevron-triple-right' : 'mdi:chevron-triple-left')
const handleMenu = (menu: Store.MenuOption, index: number) => {
  if (menu.children) {
    state.secondaryMenus = menu.children
    sidebarVisible.value = true
  } else {
    RouterHelpers.handleClickMenu(menu.key)
    if (!isFixed.value) sidebarVisible.value = false
    state.secondaryMenus = []
    // isFixed.value = false
  }
  state.currentIndex = index
}

const isExists = (menus: Store.MenuOption[], key: string) => {
  return menus.some(menu => {
    if (menu.key === key) return true
    if (menu.children) return isExists(menu.children, key)
  })
}

const isActive = (menu: Store.MenuOption, index: number) => {
  return index === state.currentIndex ? 'active' : undefined
}

// 找到激活的index
const findActiveIndex = () => {
  return routeStore.menus.findIndex(menu => {
    if (menu.children) {
      return isExists(menu.children, route.path)
    }
    return menu.key === route.path
  })
}

const onMouseLeave = () => {
  if (!isFixed.value) sidebarVisible.value = false
  state.currentIndex = findActiveIndex()
}
// 设置默认激活index
state.currentIndex = findActiveIndex()
</script>

<template>
  <div :class="mixedMenuClass" class="mixedMenu" @mouseleave="onMouseLeave">
    <div :class="collapsedClass" class="mixedMenu-main">
      <logo />
      <div class="mixedMenu-main-scroll">
        <div
            v-for="(menu,i) in routeStore.menus"
            :key="menu.key"
            :class="isActive(menu,i)"
            class="mixedMenu-main-scroll-menu"
            @click="handleMenu(menu,i)">
          <n-popover :disabled="!isCollapsed" trigger="hover">
            <template #trigger>
              <span><icon :icon="menu?.meta?.icon" size="24" /></span>
            </template>
            <span>{{ menu?.meta?.title }}</span>
          </n-popover>
          <n-ellipsis v-if="!isCollapsed" class="mixedMenu-main-scroll-menu-name">{{ menu?.meta?.title }}</n-ellipsis>
        </div>
      </div>
      <div class="mixedMenu-main-collapsedContainer" @click="toggleCollapsed()">
        <icon :icon="collapsedIcon" pointer size="22" />
      </div>
    </div>
    <transition name="slideIn">
      <div v-show="sidebarVisible" :class="collapsedClass" class="mixedMenu-sidebar">
        <div class="mixedMenu-sidebar-header">
          <logo />
          <icon :icon="thumbtackIcon" pointer @click="toggleFixed()" />
        </div>
        <div class="mixedMenu-sidebar-scroll">
          <Menu :menus="state.secondaryMenus" :mode="MenuModeEnum.SIDE" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.mixedMenu {
  display: flex;
  height: 100%;
  position: relative;
  transition: all .3s;
  width: @mixedMenuWidth;

  &.extend {
    width: calc(@mixedMenuWidth + @sidebarWidth);
  }

  &.collapsedExtend {
    width: calc(@collapsedMixedMenuWidth + @sidebarWidth);
  }

  &.collapsed {
    width: @collapsedMixedMenuWidth;
  }


  &-main {
    width: @mixedMenuWidth;
    height: 100%;
    background: @subBackgroundColor;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    transition: all .3s;
    box-shadow: 0 0 5px @shadow;

    &.collapsed {
      width: @collapsedMixedMenuWidth;

      svg {
        width: 22px;
        height: 22px;
      }
    }

    &-scroll {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 5px;

      &-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 20px;
        transition: .2s ease-in-out;
        padding: 10px;
        border-radius: 10px;

        &:hover {
          color: @theme;
          background: @hoverBackgroundColor;
        }

        &.active {
          background: @fadedThemeColor;
          color: @theme;
        }

        &-name {
          font-size: 14px;
        }
      }
    }

    &-collapsedContainer {
      width: 100%;
      height: @footerHeight;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .3s;
      cursor: pointer;

      &:hover {
        color: @theme;
      }
    }
  }

  &-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    margin-left: @mixedMenuWidth;
    width: @sidebarWidth;
    height: 100%;
    background: @subBackgroundColor;
    border-right: 1px solid @divider;
    border-left: 1px solid @divider;
    display: flex;
    flex-direction: column;
    opacity: 1;
    z-index: 3;
    transition: .3s;

    &.collapsed {
      margin-left: @collapsedMixedMenuWidth;
    }

    &-header {
      display: grid;
      grid-template-columns: 1fr 30px;
      justify-items: center;
      align-items: center;
      border-bottom: 1px solid @divider;
    }

    &-scroll {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: .3s ease-in;
}

.slideIn-enter-from,
.slideIn-leave-to {
  margin-left: 0;
  opacity: 0;
}
</style>