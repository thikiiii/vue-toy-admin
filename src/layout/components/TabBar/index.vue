<template>
    <div class="tabBar">
        <div class="tabBar-left-btn">
            <icon icon="chevron-left" size="26" />
        </div>
        <div class="tabBar-left-btn">
            <icon icon="chevron-left" size="26" />
            测试
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'

const layoutStore = useLayoutStore()
const { tabBarHeight } = storeToRefs(layoutStore)
</script>

<style lang="less" scoped>
.tabBar {
    width: 100%;
    padding: 5px;
    height: v-bind(tabBarHeight);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background: @backgroundColor;
    border-bottom: 1px solid @divder;
    transition: none;
    
    &-left-btn {
        background: @subBackgroundColor;
        display: flex;
        justify-content: center;
        box-shadow: 0 0 5px @divder;
        align-items: center;
    }
}
</style>