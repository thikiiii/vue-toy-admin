declare namespace Axios {
    type AxiosRequestConfig = import('axios').AxiosRequestConfig

    interface Config extends AxiosRequestConfig {
        // 忽略重复请求
        ignoreRepeatRequest?: boolean
    }
}
