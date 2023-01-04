import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'

export class VAxios {
    instance: AxiosInstance

    pendingMap = new Map<string, AbortController>()

    constructor(createAxiosDefaults: Axios.Config) {
        this.instance = axios.create(createAxiosDefaults)
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
    }

    async request<D = any>(config: Axios.Config): Promise<[ boolean,D ]> {
        const key = this.getPendingKey(config)
        // 处理取消请求
        this.handleSignal(config, key)
        try {
            const res = await this.instance.request<null, D>(config)
            this.pendingMap.delete(key)
            return [ false, res ]
        } catch (e) {
            this.pendingMap.delete(key)
            return [ true, {} as D ]
        }
    }

    get<D = any>(url: string, data?: any, config?: Axios.Config) {
        return this.request<D>({ ...config, url, params: data, method: 'GET' })
    }

    post<D = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'POST' })
    }

    put<R = any, D = any>(url: string, data?: R, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, data, method: 'PUT' })
    }

    delete<R = any, D = any>(url: string, data?: R, config?: AxiosRequestConfig) {
        return this.request<D>({ ...config, url, params: data, method: 'DELETE' })
    }

    // 取消请求
    cancelRequest(key, reason?: string) {
        this.pendingMap.get(key)?.abort(reason)
        // this.
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.pendingMap.forEach((value) => value.abort(reason))
    }

    private getPendingKey({ method, url }: Axios.Config) {
        return [ method, url ].join('&')
    }

    private handleSignal(config: Axios.Config, key: string) {
        if (!config.signal) {
            if (this.pendingMap.has(key)) {
                config.signal = this.pendingMap.get(key)?.signal
            } else {
                const controller = new AbortController()
                config.signal = controller.signal
                this.pendingMap.set(key, controller)
            }
        }
    }
}
