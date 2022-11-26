<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'
import { ThemeModeEnum } from '@/enums/theme'
import { computed } from 'vue'
import IconHoverContainer from '../IconHoverContainer/index.vue'

defineOptions({ name: 'ThemeSwitch' })

const themeStore = useThemeStore()

const iconName = computed(() => {
  switch (themeStore.themeMode) {
    case ThemeModeEnum.LIGHT:
      return 'ic:outline-wb-sunny'
    case ThemeModeEnum.DARK:
      return 'ic:outline-dark-mode'
    default:
      return 'mdi:white-balance-sunny'
  }
})
</script>

<template>
  <icon-hover-container content="主题切换" @click="themeStore.toggleTheme()">
    <icon :icon="iconName" />
  </icon-hover-container>
</template>

<style lang="less" scoped>
.themeSwitch {
  color: @mainTextColor;
}
</style>