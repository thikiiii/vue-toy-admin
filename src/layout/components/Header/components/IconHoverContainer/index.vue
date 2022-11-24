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
        <div class="iconHoverContainer-iconFull">
          <slot></slot>
        </div>
      </template>
      <span>{{ props.content }}</span>
    </n-popover>
  </div>
</template>

<style lang="less" scoped>
.iconHoverContainer {
  transition: .1s;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: @hoverBackgroundColor;
  }

  &-iconFull {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }
}
</style>