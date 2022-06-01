import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const autoComponents = () => Components({
    // 为全局组件生成 TypeScript 声明
    dts: true,
    resolvers: [
        // naice 组件
        NaiveUiResolver(),
        // icon
        IconsResolver({
            // 前缀
            prefix: 'icon',
            // 限制 icon 为 饿了么的
            enabledCollections: ['ep']
        })]
})
