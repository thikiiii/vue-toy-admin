<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'

const themeStore = useThemeStore()
</script>

<template>
    <icon v-if="themeStore.themeType==='light'" class="themeSwitch" icon="white-balance-sunny" size="22"
          @click="themeStore.setTheme('dark')" />
    <icon v-else class="themeSwitch" icon="weather-night" size="22" @click="themeStore.setTheme('light')" />
</template>

<style lang="less" scoped>
.themeSwitch {
    color: @mainTextColor;
}
</style>