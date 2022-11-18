<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'
import { ThemeModeEnum } from '@/enums/theme'

const themeStore = useThemeStore()
</script>

<template>
  <icon
      v-if="themeStore.themeMode==='light'" class="themeSwitch" icon="white-balance-sunny" size="22"
      @click="themeStore.setTheme(ThemeModeEnum.DARK)" />
  <icon v-else class="themeSwitch" icon="weather-night" size="22" @click="themeStore.setTheme(ThemeModeEnum.LIGHT)" />
</template>

<style lang="less" scoped>
.themeSwitch {
  color: @mainTextColor;
}
</style>