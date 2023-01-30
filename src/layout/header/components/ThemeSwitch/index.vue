<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'
import { computed } from 'vue'
import IconHoverContainer from '../IconHoverContainer/index.vue'

defineOptions({ name: 'ThemeSwitch' })

const themeStore = useThemeStore()

const iconName = computed(() => {
    switch (themeStore.themeMode) {
        case 'light':
            return 'ic:outline-wb-sunny'
        case 'dark':
            return 'ic:outline-dark-mode'
        default:
            return 'mdi:white-balance-sunny'
    }
})
</script>

<template>
    <icon-hover-container
        content="主题切换"
        @click="themeStore.toggleLightOrDarkTheme()"
    >
        <icon :icon="iconName" />
    </icon-hover-container>
</template>

<style lang="less" scoped>
.themeSwitch {
  color: @mainTextColor;
}
</style>
