import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { Cancel } from '@/services/customizeAxios/cancel'

export class CustomizeAxios {

    // 取消请求实例
    readonly cancel: Cancel
    // axios 实例
    private readonly axios: AxiosInstance
    private readonly defaultConfig: Axios.DefaultConfig

    constructor(defaultConfig: Axios.DefaultConfig) {
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
            (config: Axios.RequestConfigR) => {
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

    // request<D>(config: Axios.RequestConfigR<undefined | false>): Promise<D>
    // request<D>(config: Axios.RequestConfigR<true>): Promise<AxiosResponse<D>>
    async request<D = any>(config: Axios.RequestConfig) {
        const res = await this.axios.request<D>(config)
        if (config.isReturnNative) {
            return this.handleRequest({ isReturnNative:true }, res)
        } else {
            return this.handleRequest({ isReturnNative:false }, res)
        }
    }

    handleRequest<D>(config: Axios.RequestConfigR<undefined | false>, res: AxiosResponse<D>): D
    handleRequest<D>(config: Axios.RequestConfigR<true>, res: AxiosResponse<D>): AxiosResponse<D>
    handleRequest<D = any>(config: Axios.RequestConfig, res: AxiosResponse<D>) {
        if (config.isReturnNative) {
            return res
        } else {
            return res.data
        }
    }

}


const config: Axios.RequestConfig = {
    isReturnNative:true
}

const data = new CustomizeAxios({}).request<{ test: number }>(config).then(value => {
    value
})
