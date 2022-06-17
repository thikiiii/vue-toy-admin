<script lang="ts" setup>
import { Logo, MenuContent } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'
import {
    AppRefresh,
    AppSearch,
    Breadcrumb,
    FullScreen,
    Github,
    MenuCollapsed
} from '@/layout/components/Header/components'
import { provide } from 'vue'
import Avatar from '@/layout/components/Header/components/Avatar.vue'


const layoutStore = useLayoutStore()
provide('size', '22')

</script>
<template>
    <div class="headerContent">
        <div class="headerContent-left">
            <template v-if="layoutStore.menuMode==='side'||layoutStore.isMobile">
                <!-- 菜单折叠 -->
                <menu-collapsed />
                <!-- 刷新 -->
                <app-refresh />
                <!-- 面包屑 -->
                <breadcrumb />
            </template>
            <template v-if="layoutStore.menuMode==='top'&&!layoutStore.isMobile">
                <!-- LOGO -->
                <div class="headerContent-left-logo-container">
                    <logo />
                </div>
                <!-- 水平菜单 -->
                <menu-content collapsed mode="horizontal" />
            </template>
        </div>
        <div class="headerContent-right">
            <!-- 搜索 -->
            <app-search />
            <!-- GITHUB -->
            <github />
            <!-- 全屏 -->
            <full-screen />
            <!-- 主题切换 -->
            <theme-switch />
            <!-- 头像和昵称 -->
            <avatar />
        </div>
    </div>
</template>
<style lang="less" scoped>
.headerContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border-bottom: 1px solid @divder;
    gap: 10px;
    
    &-left, &-right {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    
    &-left {
        flex: 1;
        overflow: hidden;
        height: 100%;
        
        &-logo-container {
            height: 100%;
            width: v-bind('layoutStore.sidebarWidth');
            flex-shrink: 0;
        }
    }
    
    &-right {
        justify-content: flex-end;
    }
}
</style>