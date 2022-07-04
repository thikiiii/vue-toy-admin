import axios from 'axios'
import { wrapperEnv } from '@/utils'

const { VITE_GLOB_API_URL } = wrapperEnv()
const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})
axiosInstance.interceptors.response.use((response) => {
    return response.data
}, error => {
    console.log(error)
})
export default axiosInstance