/*
* 1、取消请求
* 2、取消重复请求
* */
export class AxiosCancelController {
    pending = new Map<string, AbortController>()

    // 添加
    addPending(config: Axios.defaultConfig) {
        const controller = new AbortController()
        this.pending.set(this.getPendingKey(config), controller)
    }



    // 取消请求
    cancel() {

    }

    // 取消全部请求
    cancelAll() {

    }
}
