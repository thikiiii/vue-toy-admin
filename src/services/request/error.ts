// 不需要退出登录错误状态码
import { AxiosError } from 'axios'
import { extractNumbers } from '@/utils/regularCheck'
import useAuthStore from '@/store/modules/auth'
import { discreteApi } from '@/plugIn/naiveUi/discreteApi'

const NO_SIGN_OUT_STATUS_CODE = new Map<number | string, string>([
    [ 400, '400: 请求出现语法错误 ~' ], [ 403, '403: 服务器拒绝访问 ~' ], [ 404, '404: 请求的资源不存在 ~' ], [ 405, '405: 请求方法未允许 ~' ], [ 408, '408: 网络请求超时 ~' ], [ 500, '500: 服务器内部错误 ~' ], [ 501, '501: 服务器未实现请求功能 ~' ], [ 502, '502: 错误网关 ~' ], [ 503, '503: 服务不可用 ~' ], [ 504, '504: 网关超时 ~' ], [ 505, '505: http版本不支持该请求 ~' ]
])

// 退出登录错误状态码
const SIGN_OUT_STATUS_CODE = new Map<number | string, string>([ [ 401, '401: 用户未授权 ~' ] ])

// 信息错误
const MESSAGE_ERROR = new Map([ [ 'theInterfaceReturnsAnException', '接口返回异常 ~' ], [ 'timeout', '网络请求超时 ~' ], [ 'Network Error', '接口连接异常 ~' ] ])

// 用来解决重复错误提示
let lastMessage: string | undefined = undefined
export const handleErrorMessage = (message: string) => {
    if (message === lastMessage) return
    // 解决重复错误提示
    discreteApi.message.error(message, { onLeave: () => lastMessage = undefined })
    lastMessage = message
}

// 处理响应状态错误
export const handleResponseStatusError = (data: Service.Result) => {
    if (!data) {
        handleErrorMessage(MESSAGE_ERROR.get('theInterfaceReturnsAnException') as string)
        return Promise.reject()
    }
    const noSignOutStatusMessage = NO_SIGN_OUT_STATUS_CODE.get(data.code)
    // 不需要退出登录,只错误提示
    if (noSignOutStatusMessage) {
        handleErrorMessage(noSignOutStatusMessage)
        return Promise.reject(data)
    }
    const signOutStatusMessage = SIGN_OUT_STATUS_CODE.get(data.code)
    // 退出登录
    if (signOutStatusMessage) {
        handleErrorMessage(signOutStatusMessage)
        void useAuthStore().signOut()
    }
}

// 处理拦截器错误
export const handleInterceptorError = (axiosError: AxiosError) => {
    // 提取Code
    const code = extractNumbers(axiosError.message)
    let message = NO_SIGN_OUT_STATUS_CODE.get(code)
    MESSAGE_ERROR.forEach((value, key) => {
        if (axiosError.message.includes(key)) message = value
    })
    message && handleErrorMessage(message)
    return Promise.reject(message)
}
