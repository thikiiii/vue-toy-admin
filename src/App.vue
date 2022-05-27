<template>
  <n-config-provider :theme="theme" :theme-overrides="themeStore.currentThemeOverrides">
    <app-provider>
      <router-view/>
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, NConfigProvider } from 'naive-ui'
import AppProvider from '@/components/AppProvider/index.vue'
import { useStoreTheme } from '@/store/modules/theme'
import { computed } from 'vue'

const themeStore = useStoreTheme()
// 主题类型
const theme = computed(() => themeStore.themeType === 'dark' ? darkTheme : null)
</script>
