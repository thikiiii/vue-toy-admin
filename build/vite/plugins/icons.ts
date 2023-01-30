import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export const setupIcons = (viteEnv: ImportMetaEnv) => [ Icons({
    compiler: 'vue3',
    // 自动安装
    autoInstall: true
}),
createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [ path.resolve(process.cwd(), 'src/assets/svgs') ],
    // 指定symbolId格式
    symbolId: `${viteEnv.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
    // 插入位置
    inject: 'body-last',
    customDomId: 'LOCAL_ICON'
}) ]
