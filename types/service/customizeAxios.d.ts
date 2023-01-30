declare namespace CAxios {
    type AxiosRequestConfig = import('axios').AxiosRequestConfig

    // 自动重试
    interface ErrorAutoRetry {
        onRetry
        // 次数
        retries: number

        // 延时
        delay: number

        // 重试条件
        retryCondition: () => boolean
    }

    // 拦截器
    interface RequestConfig extends AxiosRequestConfig {
        // 忽略重复请求( 如果打开取消重复请求，则禁止取消请求，cancelRequest 函数无效)
        // ignoreRepeatRequest?: boolean,

        // 是否序列话
        isSerialize?: boolean

        // 自动重试
        autoRetry?: ErrorAutoRetry
    }

    interface Interceptor {
        // 请求拦截器
        requestInterceptor?(config: RequestConfig): RequestConfig

        // 请求错误处理
        requestInterceptorCatch?(e: import('axios').AxiosError): Promise<any>

        // 响应拦截器
        responseInterceptors?(
            config: import('axios').AxiosResponse
        ): import('axios').AxiosResponse | Promise

        // 响应错误处理
        responseInterceptorsCatch?(e: import('axios').AxiosError): Promise<any>
    }


    interface DefaultConfig extends RequestConfig {
        // 拦截器
        interceptor?: Interceptor
    }

    type Response<D> = D & {
        // 响应体
        $responseBody: import('axios').AxiosResponse<D>
    }
}
