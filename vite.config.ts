import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { viteMockServe } from 'vite-plugin-mock'


export default defineConfig(({ command, mode }) => {
    // 是否生产环境
    const isBuild = command === 'build'
    const root = process.cwd()
    const viteEnv = loadEnv(mode, root)
    console.log(viteEnv.VITE_USE_MOCK)
    return {
        root,
        base: '/',
        plugins: [
            vue(),
            Icons({
                compiler: 'vue3',
                // 自动安装
                autoInstall: true
            }),
            // 组件自动按需导入
            Components({
                dts: true,
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        // 前缀
                        prefix: 'icon'
                    }) ]
            }),
            viteMockServe({
                mockPath: './mock', //mock文件地址
                // localEnabled: localEnabled, // 开发打包开关
                // prodEnabled: prodEnabled, // 生产打包开关
                // 这样可以控制关闭mock的时候不让mock打包到最终代码内
                //       injectCode: `
                //   import { setupProdMockServer } from './mockProdServer';
                //   setupProdMockServer();
                // `,
                logger: true //是否在控制台显示请求日志
                // supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
            })
        ],
        server: {
            host: true
        },
        resolve: {
            // 别名
            alias: {
                '@': path.resolve('src')
            },
            extensions: [ '.js', '.ts', '.tsx', '.jsx', '.vue' ]
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

    }
})
