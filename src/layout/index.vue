<template>
    <n-layout class="layout" has-sider position="absolute">
        <!-- PC 侧边栏 -->
        <n-layout-sider
            v-if="!isMobile && menuMode==='side'"
            :collapsed="collapsed"
            :collapsed-width="sidebarCollapsedWidth"
            :width="sidebarWidth"
            collapse-mode="width"
            inverted
            show-trigger="bar"
            @collapse="layoutStore.setCollapsed(true)"
            @expand="layoutStore.setCollapsed(false)">
            <logo />
            <menu-content :collapsed="collapsed" inverted />
        </n-layout-sider>
        <!-- 移动端侧边栏 -->
        <overlay v-model:show="mobileMenuVisible">
            <n-layout-sider :width="sidebarWidth" class="layout-mobileMenu" inverted>
                <logo />
                <menu-content inverted />
            </n-layout-sider>
        </overlay>
        <n-layout>
            <!-- 头部 -->
            <n-layout-header class="layout-header">
                <header-content />
            </n-layout-header>
            <tab-bar />
            <!-- 内容 -->
            <n-layout-content class="layout-main">
                <main-content />
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import { HeaderContent, Logo, MainContent, MenuContent, TabBar } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Overlay } from '@/components/Overlay/index'

const layoutStore = useLayoutStore()
const {
    sidebarCollapsedWidth,
    sidebarWidth,
    collapsed,
    headerHeight,
    tabBarHeight,
    isMobile,
    mobileMenuVisible,
    menuMode
} = storeToRefs(layoutStore)
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
    
    &-mobileMenu {
        height: 100vh;
    }
}
</style>