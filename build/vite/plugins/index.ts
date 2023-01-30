// 导出vite插件
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { setupMock } from './mock'
import { setupAutoComponents } from './autoComponents'
import { setupHtml } from './html'
import { setupCompress } from './compress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { setupIcons } from './icons'
import { setupPwa } from './pwa'

export const createVitePlugins = (viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] => {
    const { VITE_USE_MOCK, VITE_LEGACY, VITE_USE_PWA } = viteEnv
    const plugins: PluginOption[] = [
        vue(),
        DefineOptions(),
        // Jsx 语法
        vueJsx(),
        // 组件自动按需导入
        setupAutoComponents(),
        // 配置 ejs
        setupHtml(viteEnv, isBuild),
        // 配置icon
        ...setupIcons(viteEnv)
    ]
    // mock
    VITE_USE_MOCK && plugins.push(setupMock(isBuild))

    if (isBuild) {
        // 兼容一些旧版浏览器
        VITE_LEGACY && plugins.push(legacy({ targets: [ 'defaults', 'not IE 11' ] }))
        // PWA
        VITE_USE_PWA && plugins.push(setupPwa())
        plugins.push(...[ setupCompress(viteEnv) ])
    }
    return plugins
}
