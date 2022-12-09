<script lang="ts" setup>
defineOptions({ name: 'ConfigMenu' })

interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="configMenu">
    <span class="configMenu-title">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.configMenu {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-title {
    color: @mainTextColor;
  }
}
</style>