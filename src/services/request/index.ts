import axios from 'axios'
import { wrapperEnv } from '@/utils'

const { VITE_GLOB_API_URL } = wrapperEnv()
const request = axios.create({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})

request.interceptors.request.use((config) => {
    console.log(config)
}, error => {
    return Promise.reject(error)
})
request.interceptors.response.use((response) => {
    return response.data
}, error => {
    console.log(error)
})
export default request