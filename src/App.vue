<template>
  <n-config-provider :theme="themeStore.naiveThemeType" :theme-overrides="themeStore.currentThemeOverrides">
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
import { useThemeStore } from '@/store/modules/theme'
import { onBeforeUnmount, onMounted } from 'vue'
import { useLayoutStore } from "@/store/modules/layout";
import { AppStorage } from "@/storage/app";

const themeStore = useThemeStore()
const layoutStore = useLayoutStore();
// 组件库主题类型
onMounted(() => {
  // dom加载完成后 初始化主题
  themeStore.initTheme()
})
// 组件实例被卸载之前调用
onBeforeUnmount(() => {
  const { theme, themeMode, followSystem } = themeStore.$state
  const { header, sidebar, footer, app } = layoutStore.$state
  AppStorage.setSettings({ theme, themeMode, followSystem, header, sidebar, footer, app })
  debugger
});
</script>

<style lang="less" scoped>
:deep(.n-config-provider) {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>