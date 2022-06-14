<template>
    <!-- 菜单折叠 -->
    <n-icon size="24" style="cursor: pointer">
        <antd-menu-unfold-outlined
            v-if="menuIconStatus"
            @click="menuIconHandle(false)" />
        <antd-menu-fold-outlined
            v-else
            @click="menuIconHandle(true)" />
    </n-icon>
</template>

<script lang="ts" setup>
// 菜单icon 状态
import { computed } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
const menuIconStatus = computed(() => layoutStore.isMobile ? layoutStore.mobileMenuVisible : layoutStore.collapsed)

// 菜单icon 处理
const menuIconHandle = (status: boolean) => {
    layoutStore.isMobile ?
        layoutStore.setMobileMenuVisible(status) : layoutStore.setCollapsed(status)
}
</script>

<style scoped>

</style>