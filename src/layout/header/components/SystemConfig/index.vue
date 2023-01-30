<script lang="ts" setup>
import IconHoverContainer from '../IconHoverContainer/index.vue'
import SystemConfigDrawer from './components/SystemConfigDrawer/index.vue'
import { useToggle } from '@vueuse/core'

defineOptions({ name: 'SystemConfig' })
const [ drawerVisible ] = useToggle()
</script>

<template>
    <icon-hover-container content="系统配置" @click="drawerVisible = true">
        <icon icon="ant-design:setting-outlined" />
    </icon-hover-container>
    <system-config-drawer v-model:visible="drawerVisible" />
</template>

<style lang="less" scoped></style>
