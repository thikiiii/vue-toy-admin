import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { AxiosResponse } from 'axios/index'

export class CustomizeAxios {
    axiosInstance: AxiosInstance

    pendingMap = new Map<string, AbortController>()

    defaultConfig: Axios.DefaultConfig

    constructor(createAxiosDefaults: Axios.DefaultConfig) {
        this.axiosInstance = axios.create(createAxiosDefaults)
        this.defaultConfig = createAxiosDefaults
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: Axios.Config): Promise<[ boolean, D, AxiosResponse<D> ]> {
        const key = this.getPendingKey(config)
        // 处理取消请求
        this.handleSignal(config, key)
        try {
            const res = await this.axiosInstance.request<D>(config)
            this.pendingMap.delete(key)
            return [ false, res.data, res ]
        } catch (e) {
            this.pendingMap.delete(key)
            return [ true, {} as D, {} as AxiosResponse<D> ]
        }
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
        this.pendingMap.get(key)?.abort(reason)
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.pendingMap.forEach((value) => value.abort(reason))
    }

    private getPendingKey({ method, url }: Axios.Config) {
        return [ method, url ].join('&')
    }

    private handleSignal(config: Axios.Config, key: string) {
        if (config.signal) return
        if (this.pendingMap.has(key)) {
            config.signal = this.pendingMap.get(key)?.signal
        } else {
            const controller = new AbortController()
            config.signal = controller.signal
            this.pendingMap.set(key, controller)
        }
    }
}
