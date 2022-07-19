import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layout/index'

// 需要权限的路由模块 权限路由
const authRouterMoudules = import.meta.glob('../modules/**.ts', { eager: true })

// 需要权限的路由列表
export const authRouteList = Object.keys(authRouterMoudules).reduce<RouteRecordRaw[]>((routeList, routerKey) => {
    const router = (authRouterMoudules[routerKey] as any).default
    if (!Array.isArray(router)) return routeList
    routeList.push(...router)
    return routeList
}, [])

// 创建目录
export const createDirectory = (): RouteRecordRaw => ({
    path: '/',
    name: 'root',
    component: Layout,
    children: []
})