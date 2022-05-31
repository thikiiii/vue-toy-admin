import { defineConfig, loadEnv } from 'vite'
import * as path from 'path'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'

// plugins: [
//     vue(),
//     Icons({
//         compiler: 'vue3',
//         // 自动安装
//         autoInstall: true
//     }),
//     // 组件自动按需导入
//     Components({
//         dts: true,
//         resolvers: [
//             NaiveUiResolver(),
//             IconsResolver({
//                 // 前缀
//                 prefix: 'icon'
//             })]
//     }),
//     viteMockServe({
//         mockPath: './mock', //mock文件地址
//         // localEnabled: localEnabled, // 开发打包开关
//         // prodEnabled: prodEnabled, // 生产打包开关
//         // 这样可以控制关闭mock的时候不让mock打包到最终代码内
//         //       injectCode: `
//         //   import { setupProdMockServer } from './mockProdServer';
//         //   setupProdMockServer();
//         // `,
//         logger: true //是否在控制台显示请求日志
//         // supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
//     })
// ],

export default defineConfig(({ command, mode }) => {
    // 是否生产环境
    const isBuild = command === 'build'
    const root = process.cwd()
    // 获取并包装 .env 环境变量
    const viteEnv = wrapperEnv(loadEnv(mode, root))
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DELETE_CONSOLE } = viteEnv
    return {
        root,
        base: VITE_PUBLIC_PATH,
        plugins: createVitePlugins(viteEnv, isBuild),
        server: {
            host: true,
            port: VITE_PORT
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
        },
        esbuild: {
            // 生产环境去掉 日志 和 debugger
            pure: VITE_DELETE_CONSOLE ? ['console.log', 'debugger'] : [],
            minify: true
        }
    }
})
