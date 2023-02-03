<script lang="ts" setup>
  import ContextMenu from '../components/ConfigMenu/index.vue'
  import { useLayoutStore } from '@/store/modules/layout'

  defineOptions({ name: 'Sidebar' })
  const layoutStore = useLayoutStore()
  const { sidebar } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">侧边栏</n-divider>
  <n-space vertical>
    <context-menu label="折叠侧边栏">
      <n-switch v-model:value="sidebar.isCollapsedSidebar" />
    </context-menu>
    <context-menu label="侧边栏宽度">
      <n-input-number size="small" step="10" v-model:value="sidebar.sidebarWidth" />
    </context-menu>
    <context-menu label="侧边栏折叠宽度">
      <n-input-number size="small" step="10" v-model:value="sidebar.collapsedSidebarWidth" />
    </context-menu>
    <context-menu label="折叠混合侧边栏">
      <n-switch v-model:value="sidebar.isCollapsedMixedSidebar" />
    </context-menu>
    <context-menu label="显示混合侧边栏展开项">
      <n-switch v-model:value="sidebar.mixedSidebarDrawerVisible" />
    </context-menu>
    <context-menu label="固定混合侧边栏展开项">
      <n-switch
        :disabled="!sidebar.mixedSidebarDrawerVisible"
        v-model:value="sidebar.isFixedMixedSidebar"
      />
    </context-menu>
    <context-menu label="混合侧边栏宽度">
      <n-input-number size="small" step="10" v-model:value="sidebar.mixedSidebarWidth" />
    </context-menu>
    <context-menu label="混合侧边栏折叠宽度">
      <n-input-number size="small" step="10" v-model:value="sidebar.collapsedMixedSidebarWidth" />
    </context-menu>
  </n-space>
</template>

<style scoped></style>
