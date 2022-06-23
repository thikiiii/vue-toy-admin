import axios from 'axios'
import { wrapperEnv } from '@/utils'

const { VITE_GLOB_API_URL } = wrapperEnv()
export const request = axios.create({
    baseURL: VITE_GLOB_API_URL,
    timeout: 10000
})
