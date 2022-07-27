<script lang="ts" setup>
import { computed, onMounted, reactive, ref, TransitionGroup, watch } from 'vue'
import RenderIcon from '@/components/Render/icon'
import useTabBarStore from '@/store/modules/tabBar'
import { RouteRecordName, useRoute, useRouter } from 'vue-router'

const tabBarStore = useTabBarStore()
const route = useRoute()
const router = useRouter()

const scrollBtnVisible = ref(false)
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
const scrollRef = ref<InstanceType<typeof TransitionGroup> | null>(null)

// const {} = useScroll({ scrollContainer: scrollRef })


// const isScroll = (): boolean => {
//   const scrollDom = scrollRef.value.$el
//   if (!scrollDom) return false
//   const { clientWidth, children } = scrollDom
//   let widthSum = 0
//   return Array.from(children).some(tab => {
//     widthSum += tab.clientWidth + 15
//     return widthSum > clientWidth
//   })
// }


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
  tabBarStore.push({ meta, path, name: route.name as RouteRecordName })
}

onMounted(() => {
  addTabStore()
})

// 监听路由变化
watch(() => route.path, () => {
  addTabStore()
})

// 监听 tabBar变化
watch(tabBarStore.tabBar, () => {
  // console.log(isScroll())
  // scrollBtnVisible.value = isScroll()
})
</script>

<template>
  <div class="tabBar">
    <div v-show="scrollBtnVisible" class="tabBar-action-tab">
      <icon icon="chevron-left" size="22"/>
    </div>
    <transition-group ref="scrollRef" class="tabBar-tabContainer" name="fade" tag="div">
      <div
          v-for="(item) in tabBarStore.tabBar"
          :key="item.path"
          :class="route.path===item.path?'active':undefined"
          class="tabBar-tabContainer-tab"
          @click="router.push(item.path)"
      >
        {{ item.meta?.title }}
        <icon v-if="!item.meta?.affix" class="tabBar-tabContainer-tab-close" icon="close" size="12"
              @click.stop="tabBarStore.closeTab(item)"/>
      </div>
    </transition-group>
    <div v-show="scrollBtnVisible" class="tabBar-action-tab">
      <icon icon="chevron-right"/>
    </div>
    <n-dropdown :options="dropdownOption" @select="onSelect">
      <div class="tabBar-action-tab">
        <icon icon="chevron-down"/>
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
    box-shadow: 0 0 5px @divder;
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
      box-shadow: 0 0 5px @divder;
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

// 1. 声明过渡效果
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);
}

// 2. 声明进入和离开的状态
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform-origin: left top;
  transform: translateY(-10px) scale(0.1);
}

// 3. 确保离开的项目被移除出了布局流
//    以便正确地计算移动时的动画效果。
.fade-leave-active {
  position: absolute;
}
</style>