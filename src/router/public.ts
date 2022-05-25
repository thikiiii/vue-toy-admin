import { AppRouteRecordRaw } from '@/router/types'

// 公共、无需权限的路由
const publicRouter: AppRouteRecordRaw[] = [
    {
        path: '/',
        meta: {
            title: '主页'
        }
    }
]
export default publicRouter

