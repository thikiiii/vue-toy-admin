import { AxiosError, AxiosResponse } from 'axios'
import { handleInterceptorError, handleResponseStatusError } from '@/services/request/error'
import useMetaEnv from '@/hooks/common/useMetaEnv'
import { VAxios } from '@/services/axios/Axios'

const { VITE_GLOB_API_URL } = useMetaEnv()


export const axiosInstance = new VAxios({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})

axiosInstance.instance.interceptors.request.use((config) => {
    window.$loadingBar?.start()
    return config
}, error => {
    return Promise.reject(error)
})

axiosInstance.instance.interceptors.response.use((config: AxiosResponse<Service.BaseResponseResult>) => {
    const statusError = handleResponseStatusError(config.data)
    if (statusError) return statusError
    window.$loadingBar?.finish()
    return config
}, (error: AxiosError) => {
    return handleInterceptorError(error)
})
