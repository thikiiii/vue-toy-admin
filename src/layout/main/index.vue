<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import { computed } from 'vue'
import { startCase } from 'lodash'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'LayoutMain' })

const tabBarStore = useTabBarStore()
const layoutStore = useLayoutStore()
const { app } = layoutStore.$state
// 缓存菜单，转成大驼峰
const cacheMenus = computed(() => tabBarStore.cacheMenus.map(name => startCase(name).replace(' ', '')))
const transitionName = computed(() => app.isPageStartAnimation ? app.pageAnimationMode : undefined)
</script>

<template>
  <div class="layoutMain">
    <router-view v-if="tabBarStore.mainVisible" v-slot="{ Component, route }">
      <transition appear mode="out-in" :name="transitionName">
        <keep-alive :include="cacheMenus">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.layoutMain {
  padding: 5px 10px;
  position: relative;
  flex: 1;
}
</style>
