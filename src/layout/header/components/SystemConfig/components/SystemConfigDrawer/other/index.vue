<script lang="ts" setup>
import ContextMenu from '../components/ConfigMenu/index.vue'
import { useLayoutStore } from '@/store/modules/layout'
import { pageAnimationList } from '@/settings/app'

defineOptions({ name: 'Other' })
const layoutStore = useLayoutStore()
const { app } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">其他</n-divider>
  <n-space vertical>
    <context-menu label="开启页面切换动画">
      <n-switch v-model:value="app.isPageStartAnimation" />
    </context-menu>
    <context-menu label="页面切换动画">
      <n-select
        v-model:value="app.pageAnimationMode"
        :options="pageAnimationList"
      />
    </context-menu>
  </n-space>
</template>

<style scoped></style>
