<template>
    <div class="tabBar">
        <div class="tabBar-left-btn">
            <icon icon="chevron-left" size="22" />
        </div>
        <div class="tabBar-left-btn">
            <icon icon="chevron-left" size="22" />
            测试测试
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
    padding: 0 20px;
    height: v-bind(tabBarHeight);
    display: flex;
    //justify-content: space-between;
    align-items: center;
    gap: 15px;
    background: @mainBackgroundColor;
    transition: none;
    
    &-left-btn {
        background: @subBackgroundColor;
        display: flex;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 0 5px @divder;
        align-items: center;
        border-radius: 4px;
        height: calc(v-bind(tabBarHeight) - 15px);
        padding: 0 10px;
    }
}
</style>