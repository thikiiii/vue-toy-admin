<script lang="ts" setup>

import useAuthStore from '@/store/modules/auth'

const authStore = useAuthStore()
</script>

<template>
    <div class="main">
        <router-view v-slot="{Component,route}">
            <transition appear mode="out-in" name="zoom-fade">
                <keep-alive :include="authStore.cacheMenu">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
}
</style>