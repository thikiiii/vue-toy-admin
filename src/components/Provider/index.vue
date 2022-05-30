<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <dialog-provider />
      <n-notification-provider>
        <notification-provider />
        <n-message-provider>
          <message-provider />
          <slot />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import { DialogProvider, MessageProvider, NotificationProvider } from '@/components/Provider/index';</script>
