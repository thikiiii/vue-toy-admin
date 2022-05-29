import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: true,
            resolvers: [NaiveUiResolver()]
        })
    ],
    resolve: {
        // 别名
        alias: {
            '@': path.resolve('src')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue']
    },
    css: {
        preprocessorOptions: {
            // 配置 less 全局变量
            less: {
                modifyVars: {},
                javascriptEnabled: true,
                additionalData: `@import "src/styles/variable.less";`
            }
        }
    }

})
