import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
export default defineConfig({
    plugins: [
        vue(),
        Icons({
            compiler:'vue3',
            autoInstall:true
        }),
        Components({
            dts: true,
            resolvers: [NaiveUiResolver(),IconsResolver({
                prefix:'icon'
            })]
        })
    ],
    server: {
        host:'0.0.0.0'
    },
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
