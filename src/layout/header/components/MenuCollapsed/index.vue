<script lang="ts" setup>
  import IconHoverContainer from '../IconHoverContainer/index.vue'
  // 菜单icon 状态
  import { computed } from 'vue'
  import { useLayoutStore } from '@/store/modules/layout'

  defineOptions({ name: 'MenuCollapsed' })

  const layoutStore = useLayoutStore()
  const { mobile, sidebar } = layoutStore.$state
  const isCollapsed = computed(() =>
    mobile.isMobile ? mobile.mobileMenuVisible : sidebar.isCollapsedSidebar,
  )
  const iconName = computed(() => {
    if (!mobile.isMobile) return isCollapsed.value ? 'bi:text-indent-left' : 'bi:text-indent-right'
    else return isCollapsed.value ? 'bi:text-indent-right' : 'bi:text-indent-left'
  })

  // 菜单icon 处理
  const collapsedHandle = (status: boolean) => {
    mobile.isMobile
      ? layoutStore.toggleMobileMenuVisible(status)
      : layoutStore.toggleCollapsed(status)
  }
</script>

<template>
  <!-- 菜单折叠 -->
  <icon-hover-container content="菜单折叠" @click="collapsedHandle(!isCollapsed)">
    <icon :icon="iconName" pointer />
  </icon-hover-container>
</template>
