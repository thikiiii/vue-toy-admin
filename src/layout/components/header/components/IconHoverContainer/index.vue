<script lang="ts" setup>

defineOptions({ name: 'IconHoverContainer' })
const props = defineProps<{
  content: string
}>()
</script>

<template>
  <div class="iconHoverContainer">
    <n-popover :delay="300" trigger="hover">
      <template #trigger>
        <slot></slot>
      </template>
      <span>{{ props.content }}</span>
    </n-popover>
  </div>
</template>

<style lang="less" scoped>
.iconHoverContainer {
  transition: .1s;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: @hoverBackgroundColor;
  }
}
</style>