import { AxiosError, AxiosResponse } from 'axios'
import { handleInterceptorError, handleResponseStatusError } from '@/services/request/error'
import useMetaEnv from '@/hooks/common/useMetaEnv'
import { CustomizeAxios } from '@/services/customizeAxios/Axios'

const { VITE_GLOB_API_URL } = useMetaEnv()

export const axiosInstance = new CustomizeAxios({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})

axiosInstance.axiosInstance.interceptors.request.use((config) => {
    return config
}, error => {
    return Promise.reject(error)
})

axiosInstance.axiosInstance.interceptors.response.use((config: AxiosResponse<Service.BaseResponseResult>) => {
    const statusError = handleResponseStatusError(config.data)
    if (statusError) return statusError
    return config
}, (error: AxiosError) => {
    return handleInterceptorError(error)
})

