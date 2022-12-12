<script lang="ts" setup>
import ConfigMenu from '../ConfigMenu/index.vue'
import { useThemeStore } from "@/store/modules/theme";
import { computed } from "vue";

defineOptions({ name: 'ThemeMode' })
const railStyle = () => ({ background: '#464e62' })

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.themeMode === 'dark')
const followSystemChange = (isFollowSystem) => {
  if (isFollowSystem) {
    themeStore.setTheme(themeStore.getSystemThemeMode())
    themeStore.onSystemThemeChange()
  } else {
    themeStore.removeSystemThemeChange()
  }
}
</script>

<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <n-space size="large" vertical>
    <config-menu label="深色主题">
      <n-switch v-model:value="isDark" :rail-style="railStyle" @update:value="themeStore.toggleLightOrDarkTheme()">
        <template #checked>
          <icon color="#ffb948" icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition"/>
        </template>
        <template #unchecked>
          <icon color="#ffb948" icon="line-md:sunny-filled-loop"/>
        </template>
      </n-switch>
    </config-menu>
    <config-menu label="跟随系统">
      <n-switch v-model:value="themeStore.followSystem" :rail-style="railStyle" @update:value="followSystemChange">
        <template #checked>
          <icon icon="ic:round-hdr-auto"/>
        </template>
        <template #unchecked>
          <icon icon="ic:baseline-do-disturb-on"/>
        </template>
      </n-switch>
    </config-menu>
  </n-space>
</template>

<style lang="less" scoped>

</style>