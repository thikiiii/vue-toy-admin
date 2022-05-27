<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <dialog-content/>
      <n-notification-provider>
        <n-message-provider>
          <message-content/>
          <slot></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import MessageContent from '@/components/AppProvider/MessageContent.vue'
import DialogContent from '@/components/AppProvider/DialogCotent.vue'</script>
