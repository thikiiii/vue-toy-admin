<script lang="ts" setup>

import { useRoute } from 'vue-router'
import usePermissionStore from '@/store/modules/permission'

const permissionStore = usePermissionStore()
const route = useRoute()
</script>

<template>
    <main class="main">
        <router-view v-slot="{Component}">
            <transition appear mode="out-in" name="zoom-fade">
                <keep-alive v-if="route.meta.keepAlive" :include="permissionStore.cacheMenu">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component :is="Component" v-else :key="route.fullPath" />
            </transition>
        </router-view>
    </main>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    position: relative;
}
</style>