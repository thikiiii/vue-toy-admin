<template>
    <n-layout has-sider class="layout" position="absolute">
        <n-layout-sider
            v-if="!isMobile"
            collapse-mode="width"
            :collapsed-width="sidebarCollapsedWidth"
            :width="sidebarWidth"
            :collapsed="collapsed"
            @collapse="layoutStore.setCollapsed(true)"
            @expand="layoutStore.setCollapsed(false)"
            show-trigger="bar">
            <logo />
            <menu-content :collapsed="collapsed" />
        </n-layout-sider>
        <overlay v-model:show="isShow">
            <p>1561</p>
        </overlay>
        <n-layout>
            <n-layout-header class="layout-header">
                <header-content />
            </n-layout-header>
            <tab-bar />
            <n-layout-content embedded class="layout-main">
                <main-content />
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import { HeaderContent, Logo, MainContent, MenuContent, TabBar } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Overlay } from '@/components/Overlay/index'

const layoutStore = useLayoutStore()
const {
    sidebarCollapsedWidth,
    sidebarWidth,
    collapsed,
    headerHeight,
    tabBarHeight,
    isMobile
} = storeToRefs(layoutStore)

const isShow = ref(true)
onMounted(() => {
    // 监听判断是否是移动端
    window.addEventListener('resize', layoutStore.judgeMobile)
})
onBeforeUnmount(() => {
    // 取消监听
    window.removeEventListener('resize', layoutStore.judgeMobile)
})
</script>

<style lang="less" scoped>
.layout {
    height: 100vh;
    
    &-header {
        height: v-bind(headerHeight);
    }
    
    &-main {
        padding: 20px;
        height: calc(100% - v-bind(headerHeight) - v-bind(tabBarHeight));
    }
}
</style>