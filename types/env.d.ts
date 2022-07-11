declare interface ViteEnv {
    // 端口
    readonly  VITE_PORT: number
    //  网站标题
    readonly VITE_GLOB_APP_TITLE: string
    // 资源公共路径
    readonly  VITE_PUBLIC_PATH: string
    // 是否开启mock
    readonly  VITE_USE_MOCK: boolean
    // 是否删除console
    readonly  VITE_DELETE_CONSOLE: boolean
    // API 接口地址
    readonly  VITE_GLOB_API_URL: string
    // 接口前缀
    readonly  VITE_GLOB_API_URL_PREFIX: string
    // 打包压缩类型
    readonly  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    // 打包压缩是否删除源代码
    readonly  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    // 打包是否压缩图片
    readonly  VITE_USE_IMAGEMIN: boolean
    // 是否兼容旧版浏览器。开启后打包时间会慢一倍左右。会多打出旧浏览器兼容包,且会根据浏览器兼容性自动使用相应的版本
    readonly  VITE_LEGACY: boolean
}