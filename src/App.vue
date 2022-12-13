<template>
  <n-config-provider :theme="themeStore.naiveThemeType" :theme-overrides="themeStore.currentThemeOverrides" abstract>
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <naive-tool/>
            <n-theme-editor>
              <router-view/>
            </n-theme-editor>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import NaiveTool from '@/components/NaiveTool/index.vue'
import { NConfigProvider, NThemeEditor } from 'naive-ui'
import { useGlobalEvents } from "@/hooks/effect/useGlobalEvents";
import { useGlobalInitialize } from "@/hooks/effect/useGlobalInitialize";
import { useThemeStore } from "@/store/modules/theme";
import { setupGlobalSubscribe } from "@/store/subscribe";

const themeStore = useThemeStore();

// 全局事件
useGlobalEvents()
// 全局初始化
useGlobalInitialize()
// 全局订阅
setupGlobalSubscribe()
</script>

<style lang="less" scoped>
:deep(.n-config-provider) {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>