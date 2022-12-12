import { Settings } from "@/settings";

// 登录路由路径
export const LOGIN_PATH = '/login'

// 根路由
export const ROOT_ROUTE: Route.RouteRecordRaw = {
    path: '/',
    name: 'root',
    component: 'Layout',
    redirect: Settings.homePath
}

// 固定路由
export const constRoutes: Route.RouteRecordRaw[] = [
    ROOT_ROUTE,
    {
        path: LOGIN_PATH,
        name: 'login',
        component: 'Self',
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:NotFound(.*)*',
        name: 'notFound',
        component: 'Self',
        meta: {
            title: '404'
        }
    }
]