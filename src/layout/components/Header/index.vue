<template>
    <div class="headerContent">
        <div class="headerContent-left">
            <n-icon size="24" style="cursor: pointer">
                <antd-menu-unfold-outlined @click="layoutStore.setCollapsed(false)" v-if="layoutStore.collapsed" />
                <antd-menu-fold-outlined @click="layoutStore.setCollapsed(true)" v-else />
            </n-icon>
            <n-icon size="22" class="cursor-pointer">
                <antd-reload-outlined />
            </n-icon>
            <menu-content mode="horizontal" collapsed />
        </div>
        <div class="headerContent-right">
            <n-button @click="test">test</n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MenuContent } from '@/layout/index'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
const test = () => {
}
</script>

<style lang="less" scoped>
.headerContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid @divder;
    
    &-left {
        flex: .7;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    &-right {
        flex: .3;
    }
}
</style>