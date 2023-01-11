declare namespace Axios {
    type AxiosRequestConfig = import('axios').AxiosRequestConfig

    type  Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

    // 自动重试
    interface autoRetry {
        // 延时
        delay: number,
        // 重试次数
        frequency: number
    }

    // 拦截器
    interface Interceptor {
        // 请求拦截器
        requestInterceptor?(config: RequestConfig): RequestConfig

        // 请求错误处理
        requestInterceptorCatch?(e: Error): Promise<any>

        // 响应拦截器
        responseInterceptors?(config: import('axios').AxiosResponse): import('axios').AxiosResponse | Promise

        // 响应错误处理
        responseInterceptorsCatch?(e: any): Promise<any>
    }


    interface RequestConfig extends AxiosRequestConfig {
        // 忽略重复请求
        ignoreRepeatRequest?: boolean,

        // 是否序列话
        isSerialize?: boolean

        // 自动重试
        autoRetry?: autoRetry

        // 是否返回axios原生响应
        isReturnNative?: boolean

        method?: Method
    }

    interface DefaultConfig extends RequestConfig {
        // 拦截器
        interceptor?: Interceptor
    }

    type ReturnNativeOverload<Boolean=undefined> = RequestConfig & {
        [key in keyof Pick<RequestConfig, 'isReturnNative'>]?: Boolean
    }
}
