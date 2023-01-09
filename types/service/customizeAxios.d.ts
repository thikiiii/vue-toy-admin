declare namespace CustomizeAxios {
    type AxiosRequestConfig = import('axios').AxiosRequestConfig

    type  Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

    // 自动重试
    interface autoRetry {
        // 延时
        delay: number,
        // 重试次数
        frequency: number
    }

    interface Config extends AxiosRequestConfig {
        // 忽略重复请求
        ignoreRepeatRequest?: boolean,

        // 是否序列话
        isSerialize?: boolean

        // 自动重试
        autoRetry?: autoRetry

        method?:Method
    }

    interface DefaultConfig extends Config {
    }
}
