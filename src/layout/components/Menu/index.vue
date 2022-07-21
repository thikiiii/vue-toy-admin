<template>
  <n-menu
      ref="menuRef"
      :collapsed="props.collapsed && props.mode==='vertical'"
      :collapsed-width="layoutStore.collapsedWidth"
      :default-value="route.path"
      :inverted="inverted"
      :mode="props.mode"
      :options="routeStore.menus"
      accordion
      class="menu"
      @update:value="selectMenu"/>
</template>

<script lang="ts" setup>
import { NMenu } from 'naive-ui'
import { useLayoutStore } from '@/store/modules/layout'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '@/store/modules/route'

interface Props {
  // 模式
  mode?: 'vertical' | 'horizontal'
  // 折叠
  collapsed?: boolean
  // 对比
  inverted?: boolean
}

const layoutStore = useLayoutStore()
const routeStore = useRouteStore()
const router = useRouter()
const route = useRoute()

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  collapsed: false,
  inverted: false
})

const selectMenu = (key) => {
  router.push(key)
}
</script>
