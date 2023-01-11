import { AxiosResponse } from 'axios'
import { handleInterceptorError, handleResponseStatusError } from '@/services/request/error'
import useMetaEnv from '@/hooks/common/useMetaEnv'
import { CustomizeAxios } from '@/services/customizeAxios'

const { VITE_GLOB_API_URL } = useMetaEnv()

export const serve = new CustomizeAxios({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000,
    interceptor: {
        requestInterceptor(config) {
            return config
        },
        requestInterceptorCatch() {
            return Promise.reject()
        },
        responseInterceptors(config: AxiosResponse<Service.Result>) {
            const statusError = handleResponseStatusError(config.data)
            if (statusError) return statusError
            return config
        },
        responseInterceptorsCatch(e) {
            return handleInterceptorError(e)
        }
    }
})
