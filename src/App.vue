<template>
  <n-config-provider
      :theme="themeStore.naiveThemeType"
      :theme-overrides="themeStore.currentThemeOverrides"
      abstract
  >
    <naive-provider>
      <router-view/>
    </naive-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { useGlobalEvents } from '@/hooks/effect/useGlobalEvents'
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useThemeStore } from '@/store/modules/theme'
import { useGlobalSubscribe } from '@/store/subscribe'

defineOptions({ name: 'App' })
const themeStore = useThemeStore()

// 全局事件
useGlobalEvents()
// 全局初始化
useGlobalInitialize()
// 全局订阅
useGlobalSubscribe()
</script>

<style lang="less" scoped>
:deep(.n-config-provider) {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
