import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'
import { Cancel } from '@/services/customizeAxios/cancel'

export class CustomizeAxios {
    // axios 实例
    private readonly axios: AxiosInstance
    private readonly defaultConfig: CAxios.DefaultConfig

    constructor(defaultConfig: CAxios.DefaultConfig) {
        this.axios = axios.create(defaultConfig)
        this.defaultConfig = defaultConfig
        // 取消实例
        const cancel = new Cancel()

        // 取消请求
        this.cancelRequest = cancel.cancelRequest.bind(cancel)
        // 取消全部请求
        this.cancelAllRequest = cancel.cancelAllRequest.bind(cancel)

        const {
            requestInterceptor,
            requestInterceptorCatch,
            responseInterceptors,
            responseInterceptorsCatch
        } = this.defaultConfig.interceptor || {}

        // 请求拦截器
        this.axios.interceptors.request.use(
            (config: CAxios.RequestConfig) => {
                cancel.addPending(config)
                return requestInterceptor ? requestInterceptor(config) : config
            },
            (e: AxiosError) => {
                e.config && cancel.deletePending(e.config)
                return requestInterceptorCatch ? requestInterceptorCatch(e) : Promise.reject()
            }
        )

        // 响应拦截器
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => {
                cancel.deletePending(response.config)
                return responseInterceptors ? responseInterceptors(response) : response
            },
            (e: AxiosError) => {
                e.config && cancel.deletePending(e.config)
                return responseInterceptorsCatch ? responseInterceptorsCatch(e) : Promise.reject()
            }
        )
    }

    async request<D = any>(config: CAxios.RequestConfig): Promise<CAxios.Response<D>> {
        const res = await this.axios.request<D>(config)
        console.log(res.config)
        return { ...res.data, $responseBody: res }
    }

    // 取消请求
    cancelRequest: (method: Method, url: string, reason?: string) => void

    // 取消全部请求
    cancelAllRequest: (reason?: string) => void
}

