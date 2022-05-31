import { viteMockServe } from 'vite-plugin-mock'

export const setupMock = (isBuild: boolean) => viteMockServe({
    ignore: /^_/,
    mockPath: 'mock', // mock文件地址
    localEnabled: !isBuild, // 开发打包开关
    prodEnabled: isBuild, // 生产打包开关
    // 方便控制 mockjs 是否被打包到最终代码内。如果在 main.ts 内判断，如果关闭了 mock 功能，mockjs 也会打包到构建文件内，这样会增加打包体积。
    injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
    logger: true, //是否在控制台显示请求日志
    supportTs: true, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
    watchFiles: true // 监视文件更改
})
