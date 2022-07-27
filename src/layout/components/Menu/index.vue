<template>
  <n-menu
      ref="menuRef"
      :collapsed="props.collapsed && props.mode==='vertical'"
      :collapsed-width="layoutStore.collapsedWidth"
      :default-value="route.path"
      :indent="30"
      :inverted="false"
      :mode="props.mode"
      :options="menus"
      :root-indent="24"
      :value="activeMenu"
      accordion
      class="menu"
      @update:value="selectMenu"/>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '@/store/modules/route'
import { computed, ref, watch } from 'vue'
import { MenuInst, MenuOption } from 'naive-ui'
import { jumpToNewTab } from '@/utils'
import { matchUrl } from '@/utils/regularCheck'

interface Props {
  // 模式
  mode?: 'vertical' | 'horizontal'
  // 折叠
  collapsed?: boolean
  // 对比
  inverted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  collapsed: false,
  inverted: false
})

const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
const router = useRouter()
const route = useRoute()

const menuRef = ref<MenuInst | null>(null)

// 菜单列表
const menus = computed(() => routeStore.menus as unknown as MenuOption[])
// 激活菜单
const activeMenu = computed(() => route.path)

const selectMenu = (key: string) => {
  if (matchUrl.test(key)) return jumpToNewTab(key)
  router.push(key)
}

watch(activeMenu, (newActiveMenu) => {
  // 监听路由改变后，展开激活项
  menuRef.value?.showOption(newActiveMenu)
})
</script>
