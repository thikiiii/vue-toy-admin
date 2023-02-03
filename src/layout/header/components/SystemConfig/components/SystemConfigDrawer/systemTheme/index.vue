<script lang="ts" setup>
  import { systemThemes } from '@/settings/theme'
  import { useThemeStore } from '@/store/modules/theme'

  defineOptions({ name: 'systemTheme' })

  const themeStore = useThemeStore()
</script>

<template>
  <n-divider title-placement="center">系统主题</n-divider>
  <div class="systemTheme">
    <span
      v-for="color in systemThemes"
      :key="color"
      :style="{ background: color }"
      class="systemTheme-block"
      @click="themeStore.setThemeColor(color)"
    ></span>
  </div>
</template>

<style lang="less" scoped>
  .systemTheme {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(9, 20px);
    justify-content: space-between;
    justify-items: center;
    gap: 10px;

    &-block {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 2px;
      box-shadow: 5px 5px 5px @shadow;
    }
  }
</style>
