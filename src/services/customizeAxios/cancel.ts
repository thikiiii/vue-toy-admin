/*
* 1、取消请求
* 2、取消重复请求
* */
export class Cancel {
    readonly cancelRequestMap = new Map<string, AbortController>()

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
    generateAbortControllerKey(method: CustomizeAxios.Method | undefined, url: string | undefined) {
        return [ method, url ].join('&')
    }

    generateRepeatRequestKey({ method, url, data, headers, params }: CustomizeAxios.RequestConfig) {
        return [ method, url, JSON.stringify(data), JSON.stringify(headers), JSON.stringify([ params ]) ].join('&')
    }

    // 处理取消请求
    handleCancelRequest(config: CustomizeAxios.RequestConfig) {
        if (config.signal) return
        const key = this.generateAbortControllerKey(config.method?.toUpperCase() as CustomizeAxios.Method, config.url)
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
    handleRepeatRequest(config: CustomizeAxios.RequestConfig, key) {
        if (!config.ignoreRepeatRequest) return

    }
}
