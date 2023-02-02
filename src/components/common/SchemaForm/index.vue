<script lang="tsx" setup>
import { VNode } from 'vue'

defineOptions({ name: 'SchemaForm' })

type DynamicComponent = 'input' | 'select'

interface SchemaOption {
  key: string
  renderComponent: string | DynamicComponent | VNode
  componentSlot
  props: {}
}

interface SchemaFormProps {
  scheme: SchemaOption[]
  value: {}
}

withDefaults(defineProps<SchemaFormProps>(), {})

</script>

<template>
  <n-form>
    <n-grid>
      <n-form-item-gi v-for="item in scheme" :key="item.key">
        <component :is="`n-${item.renderComponent}`" v-bind="item.props">

        </component>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<style lang="less" scoped>

</style>
