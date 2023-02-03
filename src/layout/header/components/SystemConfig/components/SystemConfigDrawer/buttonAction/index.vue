<script lang="ts" setup>
  import { useLayoutStore } from '@/store/modules/layout'
  import { useThemeStore } from '@/store/modules/theme'
  import { appSettingsInitial } from '@/settings/app'
  import { cloneDeep } from 'lodash'
  import { useClipboard } from '@vueuse/core'
  import { useMessage } from 'naive-ui'

  defineOptions({ name: 'ButtonAction' })
  const clipboard = useClipboard()
  const message = useMessage()
  const layoutStore = useLayoutStore()
  const themeStore = useThemeStore()
  const resetConfig = () => {
    const { sidebar, header, footer, app, themeMode, theme, followSystem } =
      cloneDeep(appSettingsInitial)
    layoutStore.$patch({ sidebar, header, footer, app })
    themeStore.$patch({ theme, themeMode, followSystem })
    themeStore.initTheme()
  }
  const copyConfig = () => {
    const { sidebar, footer, app, header } = layoutStore.$state
    const { followSystem, theme, themeMode } = themeStore.$state

    const settings = {
      sidebar,
      footer,
      app,
      header,
      followSystem,
      theme,
      themeMode,
    }
    clipboard.copy(JSON.stringify(settings, null, 4))
    message.success('复制成功，请粘贴到 src/settings/app.ts 文件中')
  }
</script>

<template>
  <div class="buttonAction">
    <n-button type="primary" @click="copyConfig">拷贝当前配置</n-button>
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
  }
</style>
