<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'LayoutFooter' })
const layoutStore = useLayoutStore()
const layoutFooterClass = computed(() => layoutStore.isFixedFooter ? 'fixed' : undefined)
</script>

<template>
  <div :class="layoutFooterClass" class="layoutFooter">
    Copyright ©2022 Toy Admin
  </div>
</template>

<style lang="less" scoped>
.layoutFooter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: @footerHeight;
  background: @subBackgroundColor;
  width: 100%;
  flex-shrink: 0;
  box-shadow: 0 0 5px @shadow;

  &.fixed {
    position: fixed;
    bottom: 0;
  }
}
</style>