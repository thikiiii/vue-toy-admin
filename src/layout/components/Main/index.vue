<script lang="ts" setup>

import usePermissionStore from '@/store/modules/permission'
import RootWrapper from '@/layout/components/Main/RootWrapper.vue'

const permissionStore = usePermissionStore()
</script>

<template>
    <router-view v-slot="{Component,route}">
        <transition appear mode="out-in" name="zoom-fade">
            <keep-alive :include="permissionStore.cacheMenu">
                <root-wrapper :key="route.name">
                    <component :is="Component" />
                </root-wrapper>
            </keep-alive>
        </transition>
    </router-view>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    position: relative;
    
    &-transition-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
}
</style>