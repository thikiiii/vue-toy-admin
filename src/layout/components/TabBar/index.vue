<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import useTabBarStore from '@/store/modules/tabBar'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn, useEventListener, useToggle } from '@vueuse/core'
import ContextMenu from './components/ContextMenu/index.vue'

interface ContextMenuConfig {
  // 点击Tab的路径
  tabPath: string

  // X轴
  x: undefined | number

  // Y轴
  y: undefined | number
}

defineOptions({ name: 'TabBar' })

const tabBarStore = useTabBarStore()
const route = useRoute()
const router = useRouter()

// tab 上下文菜单可见
const [ tabVisible ] = useToggle()
// 全局 上下文菜单可见
const [ globalVisible ] = useToggle()
// 滚动按钮是否可见
const [ scrollBtnVisible ] = useToggle()


const tabContainer = ref<HTMLDivElement | null>(null)

const contextMenuConfig: ContextMenuConfig = reactive({
  tabPath: '',
  x: undefined,
  y: undefined
})

const isScroll = (): boolean => {
  if (!tabContainer.value) return false
  const { clientWidth, children } = tabContainer.value
  let widthSum = 0
  return Array.from(children).some(tab => {
    widthSum += tab.clientWidth + 15
    return widthSum > clientWidth
  })
}


const addTabStore = () => {
  const { meta, path } = route
  tabBarStore.addTab({ meta, path, name: route.name as string })
}


const onScroll = (type: 'left' | 'right') => {
  if (!tabContainer.value) return
  const container = tabContainer.value
  container.scrollTo({
    left: type === 'left' ? container.scrollLeft - container.offsetWidth : container.scrollLeft + container.offsetWidth,
    behavior: 'smooth'
  })
}

// 滚动到激活位置
const scrollToActivePosition = (activePath: string) => {
  const index = tabBarStore.getIndex(activePath)
  nextTick(() => {
    tabContainer.value?.scrollTo({
      left: (tabContainer.value?.children[index] as HTMLElement).offsetLeft,
      behavior: 'smooth'
    })
  })
}

const resize = useDebounceFn(() => {
  scrollBtnVisible.value = isScroll()
}, 200)

// 显示 tab 上下文菜单
const showTabContextMenu = (e: MouseEvent, tab: Store.TabBar) => {
  const { clientX, clientY } = e
  tabVisible.value = false
  nextTick(() => {
    contextMenuConfig.x = clientX
    contextMenuConfig.y = clientY
    contextMenuConfig.tabPath = tab.path
    tabVisible.value = true
  })
}


// 滚动到指定位置 防抖
const scrollToActivePositionDebounce = useDebounceFn(() => scrollToActivePosition(route.path), 300)

useEventListener(window, 'resize', resize)

onMounted(() => {
  addTabStore()
})

// 监听路由变化
watch(() => route.path, () => {
  addTabStore()
  scrollToActivePositionDebounce()
})

// 监听 tabBar变化
watch(tabBarStore.tabBar, () => {
  nextTick(() => scrollBtnVisible.value = isScroll())
})
</script>

<template>
  <div class="tabBar">
    <div v-show="scrollBtnVisible" class="tabBar-action-tab" @click="onScroll('left')">
      <icon icon="mdi:chevron-left" />
    </div>
    <div ref="tabContainer" class="tabBar-tabContainer">
      <div
          v-for="(tab) in tabBarStore.tabBar"
          :key="tab.path"
          :class="route.path===tab.path?'active':undefined"
          class="tabBar-tabContainer-tab"
          @click="router.push(tab.path)"
          @contextmenu.prevent="showTabContextMenu($event,tab)"
      >
        {{ tab.meta?.title }}
        <icon
            v-if="!tab.meta?.affix" class="tabBar-tabContainer-tab-close" icon="mdi:close" size="12px"
            @click.stop="tabBarStore.closeTab(tab)" />
      </div>
    </div>
    <div v-show="scrollBtnVisible" class="tabBar-action-tab" @click="onScroll('right')">
      <icon icon="chevron-right" />
    </div>
    <context-menu
        v-model:visible="globalVisible"
        :is-right-click="false">
      <div class="tabBar-action-tab" @click="globalVisible=true">
        <icon icon="mdi:chevron-down" />
      </div>
    </context-menu>
  </div>
  <context-menu
      v-model:visible="tabVisible"
      :route-path="contextMenuConfig.tabPath"
      :x="contextMenuConfig.x"
      :y="contextMenuConfig.y"
      is-right-click />
</template>

<style lang="less" scoped>
.tabBar {
  width: 100%;
  padding: 0 10px;
  height: @layout-tab-bar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  &-action-tab {
    background: @subBackgroundColor;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: calc(@layout-tab-bar-height - 15px);
    height: calc(@layout-tab-bar-height - 15px);
    box-shadow: 0 0 5px @divider;
  }

  &-tabContainer {
    flex: 1;
    display: flex;
    gap: 15px;
    overflow: hidden;
    padding: 2px 0;
    position: relative;

    &-tab {
      background: @subBackgroundColor;
      display: inline-flex;
      flex-shrink: 0;
      justify-content: center;
      cursor: pointer;
      color: @mainTextColor;
      box-shadow: 0 0 5px @divider;
      align-items: center;
      border-radius: 4px;
      height: calc(@layout-tab-bar-height - 15px);
      padding: 0 15px;
      gap: 5px;

      &:hover {
        color: @mainTextColor;
      }

      &-close {
        color: @subTextColor;
        transition: .1s;
        margin-right: -5px;

        &:hover {
          color: @mainTextColor;
        }
      }

      &.active {
        color: @theme;
        //background: @theme;

        i {
          color: @subTextColor;
        }
      }
    }
  }
}
</style>