<template>
  <n-config-provider :theme="theme" :theme-overrides="themeStore.currentThemeOverrides">
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
import { computed, onMounted } from 'vue'
import { AppProvider } from '@/components/Provider/index'

const themeStore = useThemeStore()
// 组件库主题类型
const theme = computed(() => themeStore.themeType === 'dark' ? darkTheme : null)
onMounted(() => {
  // dom加载完成后 初始化主题
  themeStore.initTheme()
})
</script>
