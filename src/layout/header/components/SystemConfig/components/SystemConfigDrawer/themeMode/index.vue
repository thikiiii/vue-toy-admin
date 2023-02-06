<script lang="ts" setup>
import ConfigMenu from '../components/ConfigMenu/index.vue'
import { useThemeStore } from '@/store/modules/theme'
import { ref, watch } from 'vue'

defineOptions({ name: 'ThemeMode' })
const railStyle = () => ({ background: '#464e62' })

const themeStore = useThemeStore()
const isDark = ref(themeStore.themeMode === 'dark')
watch(
    () => themeStore.themeMode,
    () => {
        isDark.value = themeStore.themeMode === 'dark'
    }
)
const followSystemChange = isFollowSystem => {
    if (isFollowSystem) {
        themeStore.setTheme(themeStore.getSystemThemeMode())
        themeStore.onSystemThemeChange()
    } else themeStore.removeSystemThemeChange()
}
</script>

<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <n-space size="large" vertical>
    <config-menu label="深色主题">
      <n-switch
        v-model:value="isDark"
        :rail-style="railStyle"
        @update:value="themeStore.toggleLightOrDarkTheme()"
      >
        <template #checked>
          <icon
            color="#ffb948"
            icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
          />
        </template>
        <template #unchecked>
          <icon color="#ffb948" icon="line-md:sunny-filled-loop" />
        </template>
      </n-switch>
    </config-menu>
    <config-menu label="跟随系统">
      <n-switch
        v-model:value="themeStore.followSystem"
        :rail-style="railStyle"
        @update:value="followSystemChange"
      >
        <template #checked>
          <icon icon="ic:round-hdr-auto" />
        </template>
        <template #unchecked>
          <icon icon="ic:baseline-do-disturb-on" />
        </template>
      </n-switch>
    </config-menu>
  </n-space>
</template>

<style lang="less" scoped>
:global(.n-switch .n-switch__rail .n-switch__button) {
  transition: background-color 0.3s var(--n-bezier), left 0.3s var(--n-bezier),
    opacity 0.3s var(--n-bezier), max-width 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier) !important;
}
</style>
