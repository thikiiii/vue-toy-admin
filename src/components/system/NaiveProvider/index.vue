<script lang="ts" setup>
  import { NThemeEditor } from 'naive-ui'

  defineOptions({ name: 'NaiveProvider' })
</script>
<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <n-theme-editor>
            <slot></slot>
          </n-theme-editor>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>
