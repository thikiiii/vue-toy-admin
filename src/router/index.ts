import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import publicRouter from '@/router/public'
import type { App } from 'vue'


// const routerMoudules = import.meta.globEager('./modules/**.ts')
// const routeModuleList = Object.keys(routerMoudules).reduce<AppRouteRecordRaw[]>((routeList, routerKey) => {
//     const router = routerMoudules[routerKey].default
//     if (!Array.isArray(router)) return routeList
//     routeList.push(...router)
//     return routeList
// }, [])
// console.log(routeModuleList)

const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRouter as RouteRecordRaw[]
})
export { router }
router.beforeEach((to, from) => {
    console.log(window.$message)
    // return false
})
export const setupRouter = (app: App<Element>) => app.use(router)



