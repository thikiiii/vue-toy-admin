import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import publicRouter from '@/router/public'
import type { App } from 'vue'


// 需要权限的路由模块 权限路由
const authRouterMoudules = import.meta.globEager('./modules/**.ts')
// 需要权限的路由列表
const authRouteList = Object.keys(authRouterMoudules).reduce<RouteRecordRaw[]>((routeList, routerKey) => {
    const router = authRouterMoudules[routerKey].default
    if (!Array.isArray(router)) return routeList
    routeList.push(...router)
    return routeList
}, [])
const router = createRouter({
    history: createWebHashHistory(),
    routes: [ ...publicRouter ] as RouteRecordRaw[]
})

export const setupRouter = (app: App<Element>) => app.use(router)



