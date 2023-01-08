import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

export class CustomizeAxios {
    axiosInstance: AxiosInstance

    pendingRequest = new Map<string, AbortController>()

    defaultConfig: Axios.DefaultConfig

    constructor(createAxiosDefaults: Axios.DefaultConfig) {
        this.axiosInstance = axios.create(createAxiosDefaults)
        this.defaultConfig = createAxiosDefaults
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: Axios.Config): Promise<[ D, AxiosResponse<D> ]> {
        const key = this.getPendingKey(config)
        // 处理取消请求
        this.handleSignal(config, key)
        const res = await this.axiosInstance.request<D>(config).finally(() => {
            this.pendingRequest.delete(key)
        })
        console.log(res)
        return [ res.data, res ]
    }

    get<D = any>(url: string, data?: any, config?: Axios.Config) {
        return this.request<D>({ ...config, url, params: data, method: 'GET' })
    }

    post<D = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'POST' })
    }

    put<D = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'PUT' })
    }

    delete<D = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, params: data, method: 'DELETE' })
    }

    // 取消请求
    cancelRequest(key, reason?: string) {
        this.pendingRequest.get(key)?.abort(reason)
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.pendingRequest.forEach((value) => value.abort(reason))
    }

    private getPendingKey({ method, url }: Axios.Config) {
        return [ method, url ].join('&')
    }

    private handleSignal(config: Axios.Config, key: string) {
        if (config.signal) return
        if (this.pendingRequest.has(key)) {
            config.signal = this.pendingRequest.get(key)?.signal
        } else {
            const controller = new AbortController()
            config.signal = controller.signal
            this.pendingRequest.set(key, controller)
        }
    }
}
