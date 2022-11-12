<script lang="ts" setup>
// 菜单icon 状态
import {computed} from 'vue'
import {useLayoutStore} from '@/store/modules/layout'


const layoutStore = useLayoutStore()
const isCollapsed = computed(() => layoutStore.isMobile ? layoutStore.mobileMenuVisible : layoutStore.collapsed)

// 菜单icon 处理
const collapsedHandle = (status: boolean) => {
  layoutStore.isMobile ?
      layoutStore.setMobileMenuVisible(status) : layoutStore.setCollapsed(status)
}
</script>

<template>
  <!-- 菜单折叠 -->
  <icon v-if="isCollapsed" icon="format-indent-increase" pointer @click="collapsedHandle(false)"/>
  <icon v-else icon="format-indent-decrease" pointer @click="collapsedHandle(true)"/>
</template>

<style scoped>

</style>