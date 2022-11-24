<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import RenderIcon from '@/components/Render/icon'
import useTabBarStore from '@/store/modules/tabBar'
import { useRoute } from 'vue-router'
import { DropdownOption } from 'naive-ui'

interface Props {
  // 可见
  visible: boolean

  // 是否右键
  isRightClick: boolean

  // 路由路径(isRightClick 为真的时候有用)
  routePath?: string

  // X轴定位(isRightClick 为真的时候有用)
  x?: undefined | number

  // Y轴定位(isRightClick 为真的时候有用)
  y?: undefined | number
}

interface Emits {
  (e: 'update:visible', isShow: boolean): void
}

/* 刷新 | 关闭当前 | 关闭左边 | 关闭左边 | 关闭其他 | 关闭全部 */
type ContextMenuKey = 'refresh' | 'close' | 'closeLeft' | 'closeRight' | 'closeOther' | 'closeAll'
type ContextMenu = DropdownOption & {
  key: ContextMenuKey
}

defineOptions({ name: 'ContextMenu' })
const emits = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  x: 0,
  y: 0
})


const tabBarStore = useTabBarStore()
const route = useRoute()
const trigger = ref(props.isRightClick ? 'manual' : 'click')

const x = computed(() => props.isRightClick ? props.x : undefined)
const y = computed(() => props.isRightClick ? props.y : undefined)

// 如果可以右键点击就用父组件传来的 routePath ，否则就用当前页面的路由Path
const routePath = computed(() => props.isRightClick ? props.routePath as string : route.path)

// 是否禁用刷新
const isDisabledRefresh = computed(() => route.path !== routePath.value)

// 是否禁用关闭
const isDisabledClose = computed(() => {
  const tab = tabBarStore.tabBar.find(item => item.path === routePath.value)
  if (!tab) return false
  return Boolean(tab.meta?.affix)
})

// 是否禁用关闭左边
const isDisabledCloseLeft = computed(() => {
  const index = tabBarStore.getIndex(routePath.value)
  if (index === 0 || index === -1) return true
  return !tabBarStore.tabBar.slice(0, index).some(item => !item.meta?.affix)
})

// 是否禁用关闭右边
const isDisabledCloseRight = computed(() => {
  const index = tabBarStore.getIndex(routePath.value)
  if (index === tabBarStore.tabBar.length - 1 || index === -1) return true
  return !tabBarStore.tabBar.slice(index).some(item => !item.meta?.affix)
})

// 是否禁用关闭其他
const isDisabledCloseOrther = computed(() => {
  return !tabBarStore.tabBar.some(item => item.path !== routePath.value && !item.meta?.affix)
})

// 是否禁用可以关闭全部
const isDisabledCloseAll = computed(() => !tabBarStore.tabBar.some(item => !item.meta?.affix))

const contextMenuOption: ContextMenu[] = reactive([
  {
    label: '刷新',
    key: 'refresh',
    icon: () => RenderIcon({ icon: 'restore' }),
    disabled: isDisabledRefresh
  },
  {
    label: '关闭',
    key: 'close',
    icon: () => RenderIcon({ icon: 'close' }),
    disabled: isDisabledClose
  },
  {
    label: '关闭左边',
    key: 'closeLeft',
    icon: () => RenderIcon({ icon: 'format-horizontal-align-left' }),
    disabled: isDisabledCloseLeft
  },
  {
    label: '关闭右边',
    key: 'closeRight',
    icon: () => RenderIcon({ icon: 'format-horizontal-align-right' }),
    disabled: isDisabledCloseRight
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    icon: () => RenderIcon({ icon: 'swap-horizontal' }),
    disabled: isDisabledCloseOrther
  },
  {
    label: '关闭全部',
    key: 'closeAll',
    icon: () => RenderIcon({ icon: 'minus' }),
    disabled: isDisabledCloseAll
  }
])

const visible = computed({
  get() {
    return props.visible
  },
  set(newValue) {
    emits('update:visible', newValue)
  }
})

// 关闭上下文菜单
const closeContextMenu = () => {
  visible.value = false
}

const handleSelect = (key: ContextMenuKey) => {
  switch (key) {
    case 'refresh':
      tabBarStore.refreshCurrent()
      break
    case 'close':
      tabBarStore.closeTab(tabBarStore.tabBar[tabBarStore.getIndex(routePath.value)])
      break
    case 'closeLeft':
      tabBarStore.closeLeft(routePath.value)
      break
    case 'closeRight':
      tabBarStore.closeRight(routePath.value)
      break
    case 'closeOther':
      tabBarStore.closeOther(routePath.value)
      break
    case 'closeAll':
      tabBarStore.closeAll()
      break
  }
  closeContextMenu()
}

</script>

<template>
  <n-dropdown
      :options="contextMenuOption"
      :show="visible"
      :trigger="trigger"
      :x="x"
      :y="y"
      placement="bottom-start"
      @clickoutside="closeContextMenu"
      @select="handleSelect">
    <slot v-if="!isRightClick" />
  </n-dropdown>
</template>
