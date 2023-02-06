<script lang="tsx" setup>
import { NInput, SelectProps,InputProps } from 'naive-ui'

defineOptions({ name: 'SchemaForm' })
export type SchemaFormOptionType = 'input' | 'select'

export interface SchemaFormOptionTypeProps {
  input: InputProps
  select: SelectProps
}

export interface SchemaFormOption<T extends SchemaFormOptionType = SchemaFormOptionType> {
  // 渲染的组件
  type?: T

  // type组件的插槽
  typeSlot?: string

  // 表单字段
  field?: string

  // type 不等于 slot时，props的类型基于 type 中组件的props
  props?: SchemaFormOptionTypeProps[T]

  // 插槽存在时,type会无效
  slot?: string

  label: string
}

export interface SchemaFormProps {
  option: SchemaFormOption[]
  model: { [key in string]: any }
}

defineProps<SchemaFormProps>()

const dynamicComponent = (type: SchemaFormOptionType) => {
    switch (type) {
        case 'input':
            return () => {
                return (
                    <NInput placeholder="test123"></NInput>
                )
            }
    }
}
</script>

<template>
  <n-form :model="model">
    <n-form-item :label="item.label" v-for="item in option" :key="item.field">
      <component v-if="!item.slot" placeholder="testes" :is="dynamicComponent(item.type)">
        {{ item.typeSlot }}
      </component>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
