import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { fixedRoute } from '@/router/fixedRoute'
import type { App } from 'vue'
import { createGuard } from '@/router/guard'


// 需要权限的路由模块 权限路由
const authRouterMoudules = import.meta.globEager('./modules/**.ts')
// 需要权限的路由列表
export const authRouteList = Object.keys(authRouterMoudules).reduce<RouteRecordRaw[]>((routeList, routerKey) => {
    const router = authRouterMoudules[routerKey].default
    if (!Array.isArray(router)) return routeList
    routeList.push(...router)
    return routeList
}, [])
const router = createRouter({
    history: createWebHashHistory(),
    routes: fixedRoute
})

export const setupRouter = async (app: App<Element>) => {
    app.use(router)
    createGuard(router)
    await router.isReady()
}
export default router



