import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

export class CustomizeAxios {
    axiosInstance: AxiosInstance

    cancelRequestMap = new Map<string, AbortController>()

    repeatRequestMap = new Map<string, AbortController>()

    defaultConfig: CustomizeAxios.DefaultConfig

    constructor(defaultConfig: CustomizeAxios.DefaultConfig) {
        this.axiosInstance = axios.create(defaultConfig)
        this.defaultConfig = defaultConfig
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: CustomizeAxios.Config): Promise<[ D, AxiosResponse<D> ]> {
        // 生成终止控制器key
        const abortControllerKey = this.generateAbortControllerKey(config.method?.toUpperCase() as CustomizeAxios.Method, config.url as string)
        // 处理取消请求
        this.handleCancelRequest(config, abortControllerKey)
        // 处理取消重复请求
        this.handleRepeatRequest(config)
        const res = await this.axiosInstance.request<D>(config).finally(() => {
            // 删除已请求完成的
            this.cancelRequestMap.delete(abortControllerKey)
        })
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

    // 取消请求
    cancelRequest(method: CustomizeAxios.Method, url: string, reason?: string) {
        const key = this.generateAbortControllerKey(method, url)
        this.cancelRequestMap.get(key)?.abort(reason)
        this.cancelRequestMap.delete(key)
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.cancelRequestMap.forEach((value) => value.abort(reason))
        this.cancelRequestMap.clear()
    }

    // 生成中止控制器key
    private generateAbortControllerKey(method: CustomizeAxios.Method, url: string) {
        return [ method, url ].join('&')
    }

    private generateRepeatRequestKey({ method, url, data, headers, params }: CustomizeAxios.Config) {
        return [ method, url, JSON.stringify(data), JSON.stringify(headers), JSON.stringify([ params ]) ].join('&')
    }

    // 处理取消请求
    private handleCancelRequest(config: CustomizeAxios.Config, key: string) {
        if (config.signal) return
        const abortController = this.cancelRequestMap.get(key)
        if (abortController) {
            config.signal = abortController.signal
        } else {
            const controller = new AbortController()
            config.signal = controller.signal
            this.cancelRequestMap.set(key, controller)
        }
    }

    // 处理重复请求
    private handleRepeatRequest(config: CustomizeAxios.Config, key) {
        if (!config.ignoreRepeatRequest) return

    }
}
