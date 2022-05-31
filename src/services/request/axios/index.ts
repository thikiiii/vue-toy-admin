import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
/*
* 1. 统一错误处理
* 2. 重复请求
* 3. 取消请求
* 4. 重复错误提示
* 5.
* */
class Axios {
    // axiox 实例
    instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }

}
export default Axios