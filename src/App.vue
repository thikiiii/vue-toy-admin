<template>
    <n-config-provider :theme="themeStore.naiveThemeType" :theme-overrides="themeStore.currentThemeOverrides">
        <n-loading-bar-provider>
            <n-dialog-provider>
                <n-notification-provider>
                    <n-message-provider>
                        <naive-tool />
                        <router-view />
                    </n-message-provider>
                </n-notification-provider>
            </n-dialog-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

<script lang="ts" setup>
import NaiveTool from '@/components/NaiveTool/index.vue'
import { NConfigProvider } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

// 组件库主题类型
onMounted(() => {
    // dom加载完成后 初始化主题
    themeStore.initTheme()
})
</script>

<style lang="less" scoped>
:deep(.n-config-provider) {
    width: 100vw;
    height: 100vh;
    position: relative;
}
</style>