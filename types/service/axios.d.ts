declare namespace Axios {
    type AxiosRequestConfig = import('axios').AxiosRequestConfig

    interface Config extends AxiosRequestConfig {
        // 忽略重复请求
        ignoreRepeatRequest?: boolean,
    }

    interface DefaultConfig extends Config {
        // 是否返回原生响应
        isReturnNativeResponse?: boolean

    }

}
