<template>
    <div class="headerContent">
        <div class="headerContent-left">
            <template v-if="layoutStore.menuMode==='side'||layoutStore.isMobile">
                <n-icon size="24" style="cursor: pointer">
                    <antd-menu-unfold-outlined
                        v-if="menuIconStatus"
                        @click="menuIconHandle(false)" />
                    <antd-menu-fold-outlined
                        v-else
                        @click="menuIconHandle(true)" />
                </n-icon>
                <n-icon size="22" class="cursor-pointer">
                    <antd-reload-outlined />
                </n-icon>
            </template>
            <template v-if="layoutStore.menuMode==='top'&&!layoutStore.isMobile">
                <div class="headerContent-left-logo-container">
                    <logo />
                </div>
                <menu-content mode="horizontal" collapsed />
            </template>
        </div>
        <div class="headerContent-right">
            <n-button @click="test">test</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Logo, MenuContent } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'
import { computed } from 'vue'

const layoutStore = useLayoutStore()
const test = () => {
    if (layoutStore.menuMode === 'top') {
        layoutStore.menuMode = 'side'
    } else {
        layoutStore.menuMode = 'top'
    }
}

// 菜单icon 状态
const menuIconStatus = computed(() => layoutStore.isMobile ? layoutStore.mobileMenuVisible : layoutStore.collapsed)

// 菜单icon 处理
const menuIconHandle = (status: boolean) => {
    layoutStore.isMobile ?
        layoutStore.setMobileMenuVisible(status) : layoutStore.setCollapsed(status)
}
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
        gap: 10px;
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