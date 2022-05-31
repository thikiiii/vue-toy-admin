import { createHtmlPlugin } from 'vite-plugin-html'

export const setupHtml = () => createHtmlPlugin({
    minify: true,
    /**
     * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
     * @default src/main.ts
     */
    entry: 'src/main.ts',
    /**
     * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
     * @default index.html
     */
    template: 'public/index.html',

    /**
     * Data that needs to be injected into the index.html ejs template
     */
    inject: {
        data: {
            title: 'index',
            injectScript: `<script src="./inject.js"></script>`
        },
        tags: [
            {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                    id: 'tag'
                }
            }
        ]
    }
})