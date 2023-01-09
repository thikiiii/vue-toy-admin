import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { Cancel } from '@/services/customizeAxios/cancel'

export class CustomizeAxios {
    // axios 实例
    readonly axios: AxiosInstance

    // 取消请求实例
    readonly cancel: Cancel

    readonly defaultConfig: CustomizeAxios.DefaultConfig

    constructor(defaultConfig: CustomizeAxios.DefaultConfig) {
        this.axios = axios.create(defaultConfig)
        this.defaultConfig = defaultConfig
        // 取消实例
        this.cancel = new Cancel()
        // 请求拦截器
        this.axios.interceptors.request.use(this.requestInterceptor, this.requestErrorInterceptor)
        this.axios.interceptors.response.use(this.responseInterceptor, this.responseErrorInterceptor)
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: CustomizeAxios.Config): Promise<[ D, AxiosResponse<D> ]> {
        const res = await this.axios.request<D>(config)
        return [ res.data, res ]
    }

    get<D = any>(url: string, data?: any, config?: CustomizeAxios.Config) {
        return this.request<D>({ ...config, url, params: data, method: 'GET' })
    }

    post<D = any>(url: string, data?: any, config?: CustomizeAxios.Config) {
        return this.request<D>({ ...config, url, data, method: 'POST' })
    }

    put<D = any>(url: string, data?: any, config?: CustomizeAxios.Config) {
        return this.request<D>({ ...config, url, data, method: 'PUT' })
    }

    delete<D = any>(url: string, data?: any, config?: CustomizeAxios.Config) {
        return this.request<D>({ ...config, url, params: data, method: 'DELETE' })
    }

    // 请求拦截器
    private requestInterceptor(config: CustomizeAxios.Config) {
        this.cancel.handleCancelRequest(config)

        return config
    }

    // 请求错误拦截器
    private requestErrorInterceptor() {
    }

    // 响应拦截器
    private responseInterceptor(config: AxiosResponse) {
        console.log(config)
        return config
    }

    // 响应错误拦截器
    private responseErrorInterceptor() {

    }
}
