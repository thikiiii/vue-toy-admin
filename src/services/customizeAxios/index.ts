import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'
import { AxiosCancel } from '@/services/customizeAxios/AxiosCancel'

export class CustomizeAxios {
    // axios 实例
    private readonly axios: AxiosInstance
    private readonly defaultConfig: CAxios.DefaultConfig

    constructor(defaultConfig: CAxios.DefaultConfig) {
        this.axios = axios.create(defaultConfig)
        this.defaultConfig = defaultConfig
        // 取消实例
        const axiosCancel = new AxiosCancel()

        // 取消请求
        this.cancelRequest = axiosCancel.cancelRequest.bind(axiosCancel)
        // 取消全部请求
        this.cancelAllRequest = axiosCancel.cancelAllRequest.bind(axiosCancel)

        const {
            requestInterceptor,
            requestInterceptorCatch,
            responseInterceptors,
            responseInterceptorsCatch
        } = this.defaultConfig.interceptor || {}

        // 请求拦截器
        this.axios.interceptors.request.use(
            (config: CAxios.RequestConfig) => {
                axiosCancel.addPending(config)
                return requestInterceptor ? requestInterceptor(config) : config
            },
            (e: AxiosError) => {
                return requestInterceptorCatch ? requestInterceptorCatch(e) : Promise.reject()
            }
        )

        // 响应拦截器
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => {
                axiosCancel.deletePending(response.config)
                return responseInterceptors ? responseInterceptors(response) : response
            },
            (e: AxiosError) => {
                e.config && axiosCancel.deletePending(e.config)
                return responseInterceptorsCatch ? responseInterceptorsCatch(e) : Promise.reject()
            }
        )
    }

    async request<D = any>(config: CAxios.RequestConfig): Promise<CAxios.Response<D>> {
        const responseBody = await this.axios.request<D>(config)
        return { ...responseBody.data, $responseBody: responseBody }
    }

    // 取消请求
    cancelRequest: (method: Method, url: string, reason?: string) => void

    // 取消全部请求
    cancelAllRequest: (reason?: string) => void
}

