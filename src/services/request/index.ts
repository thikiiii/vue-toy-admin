import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { handleInterceptorError, handleResponseStatusError } from '@/services/request/error'
import useMetaEnv from '@/hooks/common/useMetaEnv'
import { CustomizeAxios } from '@/services/customizeAxios'

const { VITE_GLOB_API_URL } = useMetaEnv()

export const serve = new CustomizeAxios({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})

serve.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

serve.axiosInstance.interceptors.response.use((config: AxiosResponse<Service.Result>) => {
    const statusError = handleResponseStatusError(config.data)
    if (statusError) return statusError
    console.log(config)
    return config
}, (error: AxiosError) => {
    console.log(error)
    return handleInterceptorError(error)
})
