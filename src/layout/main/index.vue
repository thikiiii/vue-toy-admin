<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import { computed } from 'vue'
import { startCase } from 'lodash'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'LayoutMain' })

const tabBarStore = useTabBarStore()
const layoutStore = useLayoutStore()
const { footer } = layoutStore.$state
// 缓存菜单，转成大驼峰
const cacheMenus = computed(() => tabBarStore.cacheMenus.map(name => startCase(name).replace(' ', '')))

const layoutMainClass = computed(() => footer.footerVisible && footer.isFixedFooter ? 'reserveFooter' : undefined)
</script>

<template>
  <div :class="layoutMainClass" class="layoutMain">
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
  padding: 5px 10px;
  position: relative;
  flex: 1;

  &.reserveFooter {
    padding-bottom: calc(@footerHeight + 5px);
  }
}
</style>