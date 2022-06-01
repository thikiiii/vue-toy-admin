import compressPlugin from 'vite-plugin-compression'
// 压缩
export const setupCompress = (viteEnv: ViteEnv) => {
    const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
    switch (VITE_BUILD_COMPRESS) {
        case 'gzip':
            return compressPlugin({ ext: '.gz', deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE })

        case 'brotli':
            return compressPlugin({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
            })
    }
}