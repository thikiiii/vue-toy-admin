import axios, { AxiosError, AxiosResponse } from 'axios'
import { wrapperEnv } from '@/utils'
import { handleResponseStatusError, hanldeInterceptorError } from '@/services/request/error'

const { VITE_GLOB_API_URL } = wrapperEnv()
const axiosInstance = axios.create({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    window.$loadingBar?.start()
    return config
}, error => {
    return Promise.reject(error)
})
axiosInstance.interceptors.response.use(({ data }: AxiosResponse<Service.BaseResponse>) => {
    const statusError = handleResponseStatusError(data)
    if (statusError) return statusError
    window.$loadingBar?.finish()
    return data
}, (error: AxiosError) => {
    return hanldeInterceptorError(error)
})
export default axiosInstance