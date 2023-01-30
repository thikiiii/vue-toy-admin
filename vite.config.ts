import { defineConfig, loadEnv } from 'vite'
import * as path from 'path'
import { createVitePlugins } from './build/vite/plugins'
import { wrapperEnv } from './build/utils'

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
                '@': path.resolve('src'),
                '#': path.resolve('types')
            },
            extensions: [ '.js', '.ts', '.tsx', '.jsx', '.vue' ]
        },
        css: {
            preprocessorOptions: {
                // 配置 less 全局变量
                less: {
                    modifyVars: {},
                    javascriptEnabled: true,
                    additionalData: '@import "src/assets/styles/variable.less";'
                }
            }
        },
        build: { target: 'es2015' },
        esbuild: { pure: VITE_DELETE_CONSOLE ? [ 'console.log', 'debugger' ] : [] }
    }
})
