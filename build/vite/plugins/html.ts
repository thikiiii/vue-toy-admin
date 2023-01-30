import { createHtmlPlugin } from 'vite-plugin-html'

export const setupHtml = (viteEnv: ImportMetaEnv, isBuild: boolean) => createHtmlPlugin({
    // 生产环境压缩
    minify: isBuild,
    inject: {
        data: {
            // index.html 标题
            title: viteEnv.VITE_GLOB_APP_TITLE
        }
    }
})
