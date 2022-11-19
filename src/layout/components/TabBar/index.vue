<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import RenderIcon from '@/components/Render/icon'
import useTabBarStore from '@/store/modules/tabBar'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn, useEventListener } from '@vueuse/core'

const tabBarStore = useTabBarStore()
const route = useRoute()
const router = useRouter()

const scrollBtnVisible = ref(false)
const tabContainer = ref<HTMLDivElement | null>(null)
const dropdownOption = reactive([
  {
    label: '刷新当前',
    key: 'refresh',
    icon: () => RenderIcon({ icon: 'restore' })
  },
  {
    label: '关闭当前',
    key: 'closeCurrent',
    icon: () => RenderIcon({ icon: 'close' }),
    // 当前激活标签是固定标签时禁用
    disabled: computed(() => Boolean(route.meta?.affix))
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    icon: () => RenderIcon({ icon: 'swap-horizontal' }),
    // 只有一个不固定标签，且当前激活标签是不固定时禁用
    disabled: computed(() => !(tabBarStore.tabBar.length && tabBarStore.tabBar.some(tab => {
          return !tab.meta?.affix && route.path !== tab.path
        }))
    )
  },
  {
    label: '关闭全部',
    key: 'closeAll',
    icon: () => RenderIcon({ icon: 'minus' }),
    // 没有不固定标签时，禁用
    disabled: computed(() => !(tabBarStore.tabBar.length && tabBarStore.tabBar.some(tab => {
      return !tab.meta?.affix
    })))
  }
])


const isScroll = (): boolean => {
  if (!tabContainer.value) return false
  const { clientWidth, children } = tabContainer.value
  let widthSum = 0
  return Array.from(children).some(tab => {
    widthSum += tab.clientWidth + 15
    return widthSum > clientWidth
  })
}


const onSelect = (key) => {
  switch (key) {
    case 'refresh':
      tabBarStore.refreshCurrent()
      break
    case 'closeCurrent':
      tabBarStore.closeCurrent()
      break
    case 'closeOther':
      tabBarStore.closeOther(route.path)
      break
    case 'closeAll':
      tabBarStore.closeAll()
      break
  }
}

const addTabStore = () => {
  const { meta, path } = route
  tabBarStore.push({ meta, path, name: route.name as string })
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

useEventListener(window, 'resize', resize)

onMounted(() => {
  addTabStore()
})

// 滚动到指定位置 防抖
const scrollToActivePositionDebounce = useDebounceFn(() => scrollToActivePosition(route.path), 300)

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
      <icon icon="chevron-left" size="22" />
    </div>
    <div ref="tabContainer" class="tabBar-tabContainer">
      <div
          v-for="(item) in tabBarStore.tabBar"
          :key="item.path"
          :class="route.path===item.path?'active':undefined"
          class="tabBar-tabContainer-tab"
          @click="router.push(item.path)"
      >
        {{ item.meta?.title }}
        <icon
            v-if="!item.meta?.affix" class="tabBar-tabContainer-tab-close" icon="close" size="12"
            @click.stop="tabBarStore.closeTab(item)" />
      </div>
    </div>
    <div v-show="scrollBtnVisible" class="tabBar-action-tab" @click="onScroll('right')">
      <icon icon="chevron-right" />
    </div>
    <n-dropdown :options="dropdownOption" @select="onSelect">
      <div class="tabBar-action-tab">
        <icon icon="chevron-down" />
      </div>
    </n-dropdown>
  </div>
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
        color: white;
        background: @theme;

        i {
          color: white;
        }
      }
    }
  }
}
</style>