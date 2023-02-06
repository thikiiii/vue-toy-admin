<script lang="ts" setup>
import { appSettings } from '@/settings/app'
import { darkThemeConfig, lightThemeConfig } from '@/settings/theme'
import useMetaEnv from '@/hooks/common/useMetaEnv'

defineOptions({ name: 'AppLoading' })

const metaEnv = useMetaEnv()

const themeConfig = (() => {
    let { themeMode, theme, followSystem } = appSettings
    if (followSystem) themeMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    return themeMode === 'dark' ? darkThemeConfig(theme) : lightThemeConfig(theme)
})()
</script>

<template>
  <div
    :style="{ background: themeConfig.mainBackgroundColor }"
    class="appLoading"
  >
    <img alt="" class="appLoading-logo" src="../../../assets/images/logo.png">
    <div class="appLoading-main">
      <div
        :style="{
          borderBottomColor: appSettings.theme,
          borderTopColor: appSettings.theme,
        }"
      />
      <div :style="{ background: appSettings.theme }" />
    </div>
    <h1 :style="{ color: themeConfig.mainTextColor }" class="appLoading-title">
      {{ metaEnv.VITE_GLOB_APP_TITLE }}
    </h1>
  </div>
</template>

<style lang="less" scoped>
.appLoading {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-logo {
    margin-bottom: 60px;
    height: 80px;
  }

  &-main {
    display: block;
    position: relative;

    > div {
      display: inline-block;
      background-color: rebeccapurple;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 100%;
    }

    > div:first-child {
      position: absolute;
      width: 80px;
      height: 80px;
      background: transparent;
      border-style: solid;
      border-width: 3px;
      border-right-color: transparent;
      border-left-color: transparent;
      animation: ball-clip-rotate-pulse-rotate 1s
        cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    }

    > div:last-child {
      width: 40px;
      height: 40px;
      animation: ball-clip-rotate-pulse-scale 1s
        cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    }
  }

  &-title {
    margin-top: 60px;
  }
}

@keyframes ball-clip-rotate-pulse-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes ball-clip-rotate-pulse-scale {
  0%,
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  30% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(0.15);
  }
}
</style>
