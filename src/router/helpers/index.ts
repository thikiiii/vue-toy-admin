import { AppRouteRecordRaw } from '#/router'

// 需要权限的路由模块列表
const authRouterModulesList = import.meta.glob('../modules/**.ts', { eager: true })

// 需要权限的路由列表
export const authRouteList = Object.keys(authRouterModulesList).reduce<AppRouteRecordRaw[]>((routerModules, routerKey) => {
    const router = (authRouterModulesList[routerKey] as any).default
    if (!(router instanceof Object)) return routerModules
    routerModules.push(router)
    return routerModules
}, [])

// 创建目录
export const createRootRoute = (): AppRouteRecordRaw => ({
    path: '/',
    name: 'root',
    component: () => import('@/layout/index.vue'),
    children: []
})

// 路由路径拼接
export const routouPathSplicing = () => {

}