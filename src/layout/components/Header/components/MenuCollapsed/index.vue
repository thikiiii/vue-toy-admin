<script lang="ts" setup>
import IconHoverContainer from '../IconHoverContainer/index.vue'
// 菜单icon 状态
import { computed } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'MenuCollapsed' })

const layoutStore = useLayoutStore()
const isCollapsed = computed(() => layoutStore.isMobile ? layoutStore.mobileMenuVisible : layoutStore.collapsed)

const iconName = computed(() => isCollapsed.value ? 'bi:text-indent-left' : 'bi:text-indent-right')

// 菜单icon 处理
const collapsedHandle = (status: boolean) => {
  layoutStore.isMobile ?
      layoutStore.setMobileMenuVisible(status) : layoutStore.setCollapsed(status)
}
</script>

<template>
  <!-- 菜单折叠 -->
  <icon-hover-container content="菜单折叠" @click="collapsedHandle(!isCollapsed)">
    <icon :icon="iconName" pointer />
  </icon-hover-container>
</template>
