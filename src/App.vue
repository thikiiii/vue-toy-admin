<template>
  <n-config-provider :theme="theme" :theme-overrides="themeStore.currentThemeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <store-message-provider />
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
import { computed } from 'vue'
import StoreMessageProvider from '@/components/StoreMessageProvider/StoreMessageProvider.vue'
const themeStore = useThemeStore()
// 主题类型
const theme = computed(() => themeStore.themeType === 'dark' ? darkTheme : null)
</script>
