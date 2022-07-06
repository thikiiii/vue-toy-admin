<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <naive-tool />
                    <slot />
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import NaiveTool from '@/components/Provider/NaiveTool.vue'</script>

