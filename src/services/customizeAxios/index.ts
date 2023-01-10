import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { Cancel } from '@/services/customizeAxios/cancel'

export class CustomizeAxios {

    // 取消请求实例
    readonly cancel: Cancel
    // axios 实例
    private readonly axios: AxiosInstance
    private readonly defaultConfig: CustomizeAxios.DefaultConfig

    constructor(defaultConfig: CustomizeAxios.DefaultConfig) {
        this.axios = axios.create(defaultConfig)
        this.defaultConfig = defaultConfig
        // 取消实例
        this.cancel = new Cancel()

        const {
            requestInterceptor,
            requestInterceptorCatch,
            responseInterceptors,
            responseInterceptorsCatch
        } = this.defaultConfig.interceptor || {}

        // 请求拦截器
        this.axios.interceptors.request.use(
            (config: CustomizeAxios.RequestConfig) => {
                return requestInterceptor ? requestInterceptor(config) : config
            },
            (e) => {
                return requestInterceptorCatch ? requestInterceptorCatch(e) : Promise.reject()
            }
        )

        // 响应拦截器
        this.axios.interceptors.response.use(
            (config: AxiosResponse) => {

                return responseInterceptors ? responseInterceptors(config) : config
            },
            (e) => {
                return responseInterceptorsCatch ? responseInterceptorsCatch(e) : Promise.reject()
            }
        )
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: CustomizeAxios.RequestConfig) {
        const res = await this.axios.request<D>(config)


        return this.handleResponseData(config.isSerialize as true, { t: 11 })
    }

    get<D = any>(url: string, data?: any, config?: CustomizeAxios.RequestConfig) {
        return this.request<D>({ ...config, url, params: data, method: 'GET' })
    }

    post<D = any>(url: string, data?: any, config?: CustomizeAxios.RequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'POST' })
    }

    put<D = any>(url: string, data?: any, config?: CustomizeAxios.RequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'PUT' })
    }

    delete<D = any>(url: string, data?: any, config?: CustomizeAxios.RequestConfig) {
        return this.request<D>({ ...config, url, params: data, method: 'DELETE' })
    }

    private handleResponseData<T extends boolean>(is: T, config): CustomizeAxios.Return<T> {
        return is === true ? config : { test: 222 }
    }

    // 请求拦截器
    private requestInterceptor(config: CustomizeAxios.Config) {
        this.cancel.handleCancelRequest(config)
        const { requestInterceptor } = this.getInterceptor()
        return requestInterceptor ? requestInterceptor(config) : config
    }

    // 请求错误拦截器
    private requestErrorInterceptor(e) {
        const { requestInterceptorCatch } = this.getInterceptor()
        return requestInterceptorCatch ? requestInterceptorCatch(e) : Promise.reject()
    }

    // 响应拦截器
    private responseInterceptor(config: AxiosResponse) {
        console.log(config)
        return config
    }

    // 响应错误拦截器
    private responseErrorInterceptor() {

    }

    private getInterceptor() {
        return this.defaultConfig.interceptor || {}
    }
}
