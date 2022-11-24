<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import { computed } from 'vue'
import { startCase } from 'lodash'

const tabBarStore = useTabBarStore()
// 缓存菜单，转成大驼峰
const cacheMenus = computed(() => tabBarStore.cacheMenus.map(name => startCase(name).replace(' ', '')))
</script>

<template>
  <div class="layoutMain">
    <router-view v-if="tabBarStore.mainVisible" v-slot="{Component,route}">
      <transition appear mode="out-in" name="zoom-fade">
        <keep-alive :include="cacheMenus">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.layoutMain {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
}
</style>