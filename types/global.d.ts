declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;


declare interface ViteEnv {
    // 端口
    VITE_PORT: number
    //  网站标题
    VITE_GLOB_APP_TITLE: string
    // 资源公共路径
    VITE_PUBLIC_PATH: string
    // 是否开启mock
    VITE_USE_MOCK: boolean
    // 是否删除console
    VITE_DELETE_CONSOLE: boolean
    // API 接口地址
    VITE_GLOB_API_URL: string
    // 接口前缀
    VITE_GLOB_API_URL_PREFIX: string
    // 打包压缩类型
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    // 打包压缩是否删除源代码
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    // 打包是否压缩图片
    VITE_USE_IMAGEMIN: boolean
    // 是否兼容旧版浏览器。开启后打包时间会慢一倍左右。会多打出旧浏览器兼容包,且会根据浏览器兼容性自动使用相应的版本
    VITE_LEGACY: boolean
}