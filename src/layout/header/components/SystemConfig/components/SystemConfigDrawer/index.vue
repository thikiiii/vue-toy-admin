<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import ThemeMode from './components/ThemeMode/index.vue'

defineOptions({ name: 'SystemConfigDrawer' })

interface Props {
  visible: boolean
}

interface Emits {
  (e: 'update:visible', isShow: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})
const emits = defineEmits<Emits>()

const visible = useVModel(props, 'visible', emits)
</script>

<template>
  <n-drawer v-model:show="visible" placement="right" width="330">
    <n-drawer-content title="系统配置">
      <theme-mode />
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="less" scoped>

</style>