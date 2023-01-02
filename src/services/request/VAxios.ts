import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'

export class VAxios {
    instance: AxiosInstance
    // 中止控制器
    abortController = {
        // 进行中的请求列表
        ongoingRequests: new Map([]),
        abortAll() {

        }
    }

    constructor(createAxiosDefaults: Axios.Config) {
        this.instance = axios.create(createAxiosDefaults)
    }

    // 序列化
    static serialization(data) {
        return qs.stringify(data)
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
}

