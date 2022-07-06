import axios from 'axios'
import { wrapperEnv } from '@/utils'

const { VITE_GLOB_API_URL } = wrapperEnv()
const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    window.$loadingBar?.start()
    return config
}, error => {
    return Promise.reject(error)
})
axiosInstance.interceptors.response.use((response) => {
    window.$loadingBar?.finish()
    return response.data
}, error => {
    console.log(error)
})
export default axiosInstance