<script lang="ts" setup>
import ConfigMenu from '../ConfigMenu/index.vue'

defineOptions({ name: 'ThemeMode' })
</script>

<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <config-menu label="深色主题">
    <n-switch size="large">
      <template #checked-icon>
        <icon icon="white-balance-sunny" />
      </template>
      <template #unchecked-icon>
        <icon color="red" icon="white-balance-sunny" />
      </template>
    </n-switch>
  </config-menu>
</template>

<style lang="less" scoped>

</style>