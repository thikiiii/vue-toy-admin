import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import publicRouter from '@/router/public'


// const routerMoudules = import.meta.globEager('./modules/**.ts')
// const routeModuleList = Object.keys(routerMoudules).reduce<AppRouteRecordRaw[]>((routeList, routerKey) => {
//     const router = routerMoudules[routerKey].default
//     if (!Array.isArray(router)) return routeList
//     routeList.push(...router)
//     return routeList
// }, [])
// console.log(routeModuleList)

export default createRouter({
    history: createWebHashHistory(),
    routes: publicRouter as RouteRecordRaw[]
})


