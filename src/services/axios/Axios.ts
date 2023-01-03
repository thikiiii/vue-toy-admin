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

    async request(config: Axios.Config) {
        const key = this.getPendingKey(config)
        if (!config.signal) {
            if (this.pendingMap.has(key)) {
                config.signal = this.pendingMap.get(key)?.signal
            } else {
                const controller = new AbortController()
                config.signal = controller.signal
                this.addPending(key, controller)
            }
        }
        const data = await this.instance.request(config)
        this.pendingMap.delete(key)
        return data
    }

    get<D = any>(url: string, data?: any, config?: Axios.Config): Promise<D> {
        return this.instance.get(url, {
            params: data,
            ...config
        })
    }

    post<R = any, D = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<D> {
        return this.instance.post(url, data, config)
    }

    put<R = any, D = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<D> {
        return this.instance.put(url, data, config)
    }

    delete<R = any, D = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<D> {
        return this.instance.delete(url, {
            params: data,
            ...config
        })
    }

    addPending(key: string, abortController: AbortController) {
        this.pendingMap.set(key, abortController)
    }

    removePending() {

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
}
