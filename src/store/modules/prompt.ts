// 提供全局提示之类的函数
import { defineStore } from 'pinia'
import { MessageApi } from 'naive-ui'

export const useMessage = defineStore('message', {
    // 将返回的对象 断言成 MessageApi
    state: (): MessageApi => <MessageApi> {}
})
