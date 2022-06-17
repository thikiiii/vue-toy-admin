<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'

const themeStore = useThemeStore()
</script>

<template>
    <icon v-if="themeStore.themeType==='light'" icon="white-balance-sunny" size="22"
          @click="themeStore.setTheme('dark')" />
    <icon v-else icon="weather-night" size="22" @click="themeStore.setTheme('light')" />
</template>

<style scoped>

</style>