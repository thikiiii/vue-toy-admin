<template>
    <n-button @click="test">切换</n-button>
    <n-button @click="test2">折叠</n-button>
    <n-scrollbar x-scrollable>
        <div class="test" />
    </n-scrollbar>
</template>

<script lang="ts" setup>
    import { useThemeStore } from '@/store/modules/theme'
    import { useLayoutStore } from '@/store/modules/layout'
    
    const test = () => {
        useThemeStore().toggleTheme()
    }
    const layoutStore = useLayoutStore()
    const test2 = () => {
        layoutStore.setCollapsed(!layoutStore.collapsed)
    }
</script>

<style lang="less" scoped>
.test {
    width: 2000px;
    height: 30px;
    background: red;
}
</style>