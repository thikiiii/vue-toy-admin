<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { computed } from 'vue'

defineOptions({ name: 'IconHoverContainer' })
const props = defineProps<{
  content: string
}>()
const layoutStore = useLayoutStore()
const className = computed(() => layoutStore.topInverted ? 'inverted' : undefined)
</script>

<template>
  <div :class="className" class="iconHoverContainer">
    <n-popover :delay="300" trigger="hover">
      <template #trigger>
        <div class="iconHoverContainer-iconFull">
          <slot />
        </div>
      </template>
      <span>{{ props.content }}</span>
    </n-popover>
  </div>
</template>

<style lang="less" scoped>
.iconHoverContainer {
  transition: 0.1s;
  height: 100%;
  cursor: pointer;

  &.inverted {
    &:hover {
      background: @hoverInvertBackgroundColor;
    }
  }

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
