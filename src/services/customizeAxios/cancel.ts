import { Method } from 'axios'

/*
* 1、取消请求
* 2、取消重复请求
* */

export class Cancel {
    // 用于存放每次请求的标识和取消函数
    readonly pendingMap = new Map<string, AbortController>()

    // 生成标识
    generatePendingKey(config: CAxios.RequestConfig) {
        return [ config.method?.toLowerCase(), config.url ].join('&')
    }

    deletePending(config: CAxios.RequestConfig) {
        const key = this.generatePendingKey(config)
        this.pendingMap.delete(key)
    }

    addPending(config: CAxios.RequestConfig) {
        if (config.signal) return
        const key = this.generatePendingKey(config)
         const abortController = this.pendingMap.get(key)
        if (abortController) {
            config.signal = abortController.signal
        } else {
            const controller = new AbortController()
            this.pendingMap.set(key, controller)
            config.signal = controller.signal
        }
    }

    // 取消请求
    cancelRequest(method:Method,url:string,reason?: string) {
        const key = this.generatePendingKey({ method,url })
        this.pendingMap.get(key)?.abort(reason)
        this.pendingMap.delete(key)
    }

    // 取消全部请求
    cancelAllRequest(reason?: string) {
        this.pendingMap.forEach((value) => value.abort(reason))
        this.pendingMap.clear()
    }
}
