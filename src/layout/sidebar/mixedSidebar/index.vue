<script lang="ts" setup>
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useRouteStore } from '@/store/modules/route'
import { computed, onMounted, reactive } from 'vue'
import { useToggle } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { MenuOption } from 'naive-ui'
import { useLayoutStore } from '@/store/modules/layout'

interface State {
  // 二级菜单
  secondaryMenus: MenuOption[]
  // 当前点击的 index
  currentIndex: number | undefined
}

defineOptions({ name: 'MixedSidebar' })

const routeStore = useRouteStore()
const layoutStore = useLayoutStore()
const { sidebar } = layoutStore.$state
const [ sidebarVisible ] = useToggle(sidebar.isFixedMixedSidebar)

const route = useRoute()
const state: State = reactive({
  secondaryMenus: [],
  currentIndex: undefined
})

const mixedMenuClass = computed(() => {
  const className: string[] = []
  if (sidebar.isFixedMixedSidebar) className.push(sidebar.isCollapsedMixedSidebar ? 'collapsedExtend' : 'extend')
  if (sidebar.isCollapsedMixedSidebar && !sidebar.isFixedMixedSidebar) className.push('collapsed')
  return className.join(' ')
})

const collapsedClass = computed(() => sidebar.isCollapsedMixedSidebar ? 'collapsed' : undefined)
const thumbtackIcon = computed(() => sidebar.isFixedMixedSidebar ? 'mdi:pin-off' : 'mdi:pin')
const collapsedIcon = computed(() => sidebar.isCollapsedMixedSidebar ? 'mdi:chevron-triple-right' : 'mdi:chevron-triple-left')
const handleMenu = (menu: Store.MenuOption, index: number) => {
  if (menu.children) {
    state.secondaryMenus = menu.children as MenuOption[]
    sidebarVisible.value = true
  } else {
    routeStore.handleClickMenu(menu.key)
    if (!sidebar.isFixedMixedSidebar) sidebarVisible.value = false
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

const isActive = (index: number) => {
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
  if (!sidebar.isFixedMixedSidebar) sidebarVisible.value = false
  state.currentIndex = findActiveIndex()
}

onMounted(() => {
  const index = findActiveIndex()
  // 设置默认激活index
  state.currentIndex = index
  state.secondaryMenus = routeStore.menus[index].children || []
})

</script>

<template>
  <div :class="mixedMenuClass" class="mixedMenu" @mouseleave="onMouseLeave">
    <!-- TODO:暗黑模式下去除 inverted -->
    <div :class="collapsedClass" class="mixedMenu-main inverted">
      <logo />
      <div class="mixedMenu-main-scroll">
        <div
            v-for="(menu,i) in routeStore.menus"
            :key="menu.key"
            :class="isActive(i)"
            class="mixedMenu-main-scroll-menu"
            @click="handleMenu(menu,i)">
          <n-popover :disabled="!sidebar.isCollapsedMixedSidebar" trigger="hover">
            <template #trigger>
              <span><icon :icon="menu?.meta?.icon" size="24" /></span>
            </template>
            <span>{{ menu?.meta?.title }}</span>
          </n-popover>
          <n-ellipsis v-if="!sidebar.isCollapsedMixedSidebar" class="mixedMenu-main-scroll-menu-name">
            {{ menu?.meta?.title }}
          </n-ellipsis>
        </div>
      </div>
      <div class="mixedMenu-main-collapsedContainer" @click="layoutStore.toggleCollapsedMixedSidebar()">
        <icon :icon="collapsedIcon" pointer size="22" />
      </div>
    </div>
    <transition name="slideIn">
      <div v-show="sidebarVisible" :class="collapsedClass" class="mixedMenu-sidebar inverted">
        <div class="mixedMenu-sidebar-header">
          <logo />
          <icon :icon="thumbtackIcon" pointer @click="layoutStore.toggleFixedMixedSidebar()" />
        </div>
        <div class="mixedMenu-sidebar-scroll">
          <Menu :menus="state.secondaryMenus" inverted mode="Side" />
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
  transition: .2s ease-out;
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
    transition: .2s ease-out;
    box-shadow: 0 0 5px @shadow;

    &.inverted {
      background: @invertBackgroundColor;

      .mixedMenu-main-scroll {
        &-menu {
          color: @invertTextColor;

          &.active {
            background: @fadedThemeColor;
            color: @theme;
          }

          &:hover:not(.active) {
            color: @theme;
            background: @hoverInvertBackgroundColor;
          }
        }
      }
    }

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

        &:hover:not(.active) {
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
    transition: .2s ease-out;

    &.inverted {
      background: @invertBackgroundColor;
    }

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
  transition: .2s ease-out;
}

.slideIn-enter-from,
.slideIn-leave-to {
  margin-left: 0;
  opacity: 0;
}
</style>