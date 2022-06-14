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
                <menu-content mode="horizontal" collapsed />
            </template>
        </div>
        <div class="headerContent-right">
            <app-search />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Logo, MenuContent } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'
import { AppRefresh, AppSearch, Breadcrumb, MenuCollapsed } from '@/layout/components/Header/components'


const layoutStore = useLayoutStore()


</script>

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
    
    &-left {
        display: flex;
        flex: .7;
        gap: 15px;
        align-items: center;
        overflow: hidden;
        align-content: flex-start;
        height: 100%;
        
        &-logo-container {
            height: 100%;
            width: v-bind('layoutStore.sidebarWidth');
            flex-shrink: 0;
        }
    }
    
    &-right {
        flex: .3;
    }
}
</style>