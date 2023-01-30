import { Method } from 'axios'

export class AxiosCancel {
    // 用于存放每次请求的标识和取消函数
    readonly pendingMap = new Map<string, AbortController>()

    // 获取取消请求标识
    getCancelRequestKey({ method, url }: CAxios.RequestConfig) {
        return [ method?.toLowerCase(), url ].join('&')
    }

    // 删除Map中的标识
    deletePending(config: CAxios.RequestConfig) {
        const key = this.getCancelRequestKey(config)
        this.pendingMap.delete(key)
    }

    // 添加Map中的标识和取消函数
    addPending(config: CAxios.RequestConfig) {
        if (config.signal) return
        const key = this.getCancelRequestKey(config)
        const abortController = this.pendingMap.get(key)
        if (abortController) config.signal = abortController.signal
        else {
            const controller = new AbortController()
            this.pendingMap.set(key, controller)
            config.signal = controller.signal
        }
    }

    // 取消请求
    cancelRequest(method: Method, url: string, reason?: string) {
        const key = this.getCancelRequestKey({ method, url })
        this.pendingMap.get(key)?.abort(reason)
        this.pendingMap.delete(key)
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.pendingMap.forEach(value => value.abort(reason))
        this.pendingMap.clear()
    }
}
