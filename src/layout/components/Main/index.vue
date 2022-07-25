<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'

const tabBarStore = useTabBarStore()
</script>

<template>
  <div class="main">
    <router-view v-slot="{Component,route}">
      <transition appear mode="out-in" name="zoom-fade">
        <keep-alive :include="tabBarStore.cacheMenus">
          <component :is="Component" :key="route.fullPath"/>
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