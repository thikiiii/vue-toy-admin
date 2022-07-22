// 导出vite插件
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { setupMock } from './mock'
import { setupAutoComponents } from './autoComponents'
import { setupHtml } from './html'
import { setupCompress } from './compress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import DefineOptions from 'unplugin-vue-define-options/vite'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean): PluginOption[] => {
    const { VITE_USE_MOCK, VITE_LEGACY } = viteEnv
    const plugins: PluginOption[] = [
        vue(),
        DefineOptions(),
        Icons({
            compiler: 'vue3',
            // 自动安装
            autoInstall: true
        }),
        // Jsx 语法
        vueJsx(),
        // 组件自动按需导入
        setupAutoComponents(),
        // 配置 ejs
        setupHtml(viteEnv, isBuild)
    ]
    // mock
    VITE_USE_MOCK && plugins.push(setupMock(isBuild))

    if (isBuild) {
        // 兼容一些旧版浏览器
        VITE_LEGACY && plugins.push(legacy())
        plugins.push(...[
            setupCompress(viteEnv)
        ])
    }
    return plugins
}