<script lang="ts" setup>
import ConfigMenu from '../ConfigMenu/index.vue'

defineOptions({ name: 'ThemeMode' })
</script>

<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <config-menu label="主题切换">
    <n-switch size="large">
      <template #checked-icon>
        <icon icon="cog-outline" />
      </template>
      <template #unchecked-icon>
        <icon icon="cog-outline" />
      </template>
    </n-switch>
  </config-menu>
</template>

<style lang="less" scoped>

</style>