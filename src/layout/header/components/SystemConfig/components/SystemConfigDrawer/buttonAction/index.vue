<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import { useThemeStore } from '@/store/modules/theme'
import { appSettingsInitial } from '@/settings/system'
import { cloneDeep } from 'lodash'

defineOptions({ name: 'ButtonAction' })
const layoutStore = useLayoutStore()
const themeStore = useThemeStore()
const resetConfig = () => {

}
</script>

<template>
  <div class="buttonAction">
    <n-button type="primary">拷贝当前配置</n-button>
    <n-button type="warning" @click="resetConfig">重置当前配置</n-button>
  </div>
</template>

<style lang="less" scoped>
.buttonAction {
  display: flex;
  flex-direction: column;
  gap: 10px;
  bottom: 0;
  padding: 20px 0;
  width: 100%;
  background: @subBackgroundColor;
}
</style>