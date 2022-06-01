// 提供全局提示之类的函数
import { defineStore } from 'pinia'
import { DialogApi, MessageApi, NotificationApi } from 'naive-ui'

// 消息
export const useMessage = defineStore('message', {
    // 将返回的对象 断言成 MessageApi
    state: (): MessageApi => <MessageApi> {}
})

// 对话框
export const useDialog = defineStore('dialog', {
    // 将返回的对象 断言成 DialogApi
    state: (): DialogApi => <DialogApi> {}
})

// 通知
export const useNotification = defineStore('notification', {
    // 将返回的对象 断言成 NotificationApi
    state: (): NotificationApi => <NotificationApi> {}
})