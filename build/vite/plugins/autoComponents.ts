import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

// 自动按需注册全局组件
export const setupAutoComponents = () => Components({
    // 为全局组件生成 TypeScript 声明
    // 并指定生成目录
    dts: 'types/components.d.ts',
    extensions: [ 'vue', 'md' ],
    // allow auto import and register components used in markdown
    include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
    resolvers: [
        // naice 组件
        NaiveUiResolver(),
        // icon
        IconsResolver({
            // 不要前缀
            prefix: false,
            // 限制 icon 为mdi
            enabledCollections: [ 'mdi' ]
        }) ]
})
