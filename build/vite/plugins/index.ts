// 导出vite插件
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { setupMock } from './mock'
import { setupAutoComponents } from './setupAutoComponents'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean): PluginOption[] => {
    const { VITE_USE_MOCK } = viteEnv
    const plugins: PluginOption[] = [
        vue(),
        Icons({
            compiler: 'vue3',
            // 自动安装
            autoInstall: true
        }),
        // 组件自动按需导入
        setupAutoComponents()
    ]
    // mock
    VITE_USE_MOCK && plugins.push(setupMock(isBuild))
    return plugins
}