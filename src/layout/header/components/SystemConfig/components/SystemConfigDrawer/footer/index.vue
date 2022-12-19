<script lang="ts" setup>
import ContextMenu from '../components/ConfigMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'Footer' })
const layoutStore = useLayoutStore()
const { footer } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">底部</n-divider>
  <n-space vertical>
    <context-menu label="显示底部">
      <n-switch v-model:value="footer.footerVisible"/>
    </context-menu>
    <context-menu label="固定底部">
      <n-switch v-model:value="footer.isFixedFooter"/>
    </context-menu>
    <context-menu label="底部高度">
      <n-input-number size="small" step="10" v-model:value="footer.footerHeight"/>
    </context-menu>
  </n-space>
</template>

<style scoped>

</style>