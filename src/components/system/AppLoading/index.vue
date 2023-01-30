<script lang="ts" setup>
import { appSettings } from '@/settings/app'
import { darkThemeConfig, lightThemeConfig } from '@/settings/theme'

defineOptions({ name: 'AppLoading' })
const background = () =>{
    let { themeMode,theme,followSystem } = appSettings
    if (followSystem) themeMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    return themeMode === 'dark' ? darkThemeConfig(theme).mainBackgroundColor : lightThemeConfig(theme).mainBackgroundColor
}
</script>

<template>
  <div class="appLoading-container" :style="{background:background()}">
    <h1>测重试</h1>
  </div>
</template>

<style scoped lang="less">
.appLoading-container {
  width: 100vw;
  height: 100vh;
  h1{
    font-size: 30vw;
    color: #5aff07;
  }
}
</style>
