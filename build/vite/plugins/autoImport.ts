import AutoImport from 'unplugin-auto-import/vite'
// 自动导入 api 和 函数
export const setupAutoImport = () => AutoImport({
    // 配置那些库需要自动导入
    imports: [ 'vue', 'pinia', 'vue-router' ],
    // 为全局组件生成 TypeScript 声明
    // 并指定生成目录
    dts: 'types/auto-improt.d.ts',
    // 配置需要自动导入的目录
    dirs: [
        'src/store',
        'src/storage',
        'src/settings',
        'src/hook'
    ]
})