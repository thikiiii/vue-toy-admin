<template>
    <n-config-provider :theme="themeStore.naiveThemeType" :theme-overrides="themeStore.currentThemeOverrides">
        <n-theme-editor>
            <app-provider>
                <router-view />
            </app-provider>
        </n-theme-editor>
    </n-config-provider>
</template>

<script lang="ts" setup>
    import { NConfigProvider } from 'naive-ui'
    import { useThemeStore } from '@/store/modules/theme'
    import { onMounted } from 'vue'
    import { AppProvider } from '@/components/Provider/index'
    
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
