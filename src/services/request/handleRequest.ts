import { serve } from '@/services/request/index'

// 二级处理请求函数
export const serveRequest = <D = unknown, T = {}>(config: CAxios.RequestConfig) => serve.request<Service.Result<D, T>>(config)
