<template>
  <n-menu
      ref="menuRef"
      :collapsed="isCollapsed"
      :collapsed-width="collapsedWidth"
      :default-value="route.path"
      :indent="30"
      :inverted="inverted"
      :mode="nMenuMode"
      :options="menus"
      :root-indent="24"
      :value="activeMenu"
      accordion
      @update:value="selectMenu" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { MenuInst, MenuOption } from 'naive-ui'
import { useRouteStore } from '@/store/modules/route'
import { MenuModeEnum } from '@/enums/settings'

interface Props {
  // 模式
  mode: MenuModeEnum

  // 折叠
  collapsed?: boolean

  // 对比色
  inverted?: boolean

  // 手风琴
  accordion?: boolean

  // 折叠后的菜单宽度
  collapsedWidth?: string

  // 菜单列表
  menus: MenuOption[]
}

defineOptions({ name: 'Menu' })
const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  inverted: false
})

const route = useRoute()
const routeStore = useRouteStore()
const menuRef = ref<MenuInst | null>(null)


const collapsedWidth = computed(() => props.collapsedWidth ? parseInt(props.collapsedWidth) : undefined)
// 激活菜单
const activeMenu = computed(() => route.path)
// 是否折叠
const isCollapsed = computed(() => props.collapsed && (props.mode === 'Side' || props.mode === 'MixSide'))
// n 组件菜单模式
const nMenuMode = computed(() => props.mode === 'Top' ? 'horizontal' : 'vertical')

const selectMenu = (key: string) => {
  routeStore.handleClickMenu(key)
}

watch(activeMenu, (newActiveMenu) => {
  // 监听路由改变后，展开激活项
  menuRef.value?.showOption(newActiveMenu)
})
</script>

<style lang="less" scoped>
// 解决 icon 与 标题不对齐的问题
:global(.n-menu .n-menu-item-content .n-menu-item-content__icon) {
  //align-items: normal;
}
</style>
