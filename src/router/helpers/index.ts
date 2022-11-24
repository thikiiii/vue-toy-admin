// 需要权限的路由模块列表
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import RenderEllipsis from '@/components/Render/ellipsis'
import RenderIcon from '@/components/Render/icon'
import { ROOT_ROUTE } from '@/router/constRoutes'
import { Sort } from '@/enums/common'
import router from '@/router'
import Settings from '@/settings'

export class RouterHelpers {
    // 前端路由模块列表
    static readonly ROUTER_MODULES_LIST = import.meta.glob('../modules/**.ts', { eager: true })

    // 页面组件
    static readonly VIEW_COMPONENTS = import.meta.glob('@/views/**/**.vue')

    // 前端路由列表
    static routeList = Object.keys(this.ROUTER_MODULES_LIST).reduce<Route.RouteRecordRaw[]>((routerModules, routerKey) => {
        const router = (this.ROUTER_MODULES_LIST[routerKey] as any).default
        if (!(router instanceof Object)) return routerModules
        routerModules.push(router)
        return routerModules
    }, [])

    // 获取页面组件
    static getViewComponent(name: string) {
        const viewComponent = Object.keys(this.VIEW_COMPONENTS).find(path => path === this.transformRouteNameToComponentPath(name))
        if (!viewComponent) console.warn('没有找到组件：', name)
        return this.VIEW_COMPONENTS[viewComponent as string]
    }

    // 自定义路由转 vue 路由
    static transformCustomRouteToVueRoute(route: Route.RouteRecordRaw) {
        const vueRoute = { ...route, component: undefined } as RouteRecordRaw
        switch (route.component) {
            // 本身就是页面
            case 'Self':
                vueRoute.component = this.getViewComponent(route.name)
                break
            // 布局
            case 'Layout':
                vueRoute.component = Layout
                break
            // 菜单页面
            case 'View':
                vueRoute.component = this.getViewComponent(route.name)
                break
        }
        return vueRoute
    }

    static transformCustomRoutesToVueRoutes(routes: Route.RouteRecordRaw[]) {
        return routes.map(route => {
            const vueRoute = this.transformCustomRouteToVueRoute(route)
            if (route.children?.length) {
                vueRoute.children = this.transformCustomRoutesToVueRoutes(route.children)
            }
            return vueRoute
        })
    }

    // 路由转菜单
    static transformRouteToMenu({ path, meta, children }: Route.RouteRecordRaw): Store.MenuOption {
        return {
            key: path,
            label: meta?.title ? () => RenderEllipsis({ content: meta.title }) : '',
            icon: meta?.icon ? () => RenderIcon({ icon: meta.icon || '' }) : undefined,
            meta,
            children: children as Store.MenuOption['children']
        }
    }

    static transformRoutesToMenus(routes: Route.RouteRecordRaw[]) {
        const menus = routes.map((route) => {
            if (route.meta?.hideMenu) return undefined
            if (!route.children) return this.transformRouteToMenu(route)
            const menu = this.transformRouteToMenu(route)
            menu.children = this.transformRoutesToMenus(route.children)
            return menu
        })
        return menus.filter(menu => menu) as Store.MenuOption[]
    }

    // 用layout包装单页面路由，一级路由转二级路由
    static useLayoutWrapperSingleViewRoute(authRoutes: Route.RouteRecordRaw[]) {
        return authRoutes.map((route) => {
            if (route.children) return route
            const root: Route.RouteRecordRaw = { ...ROOT_ROUTE, name: route.name }
            root.children = [ route ]
            return root
        })
    }

    // 路由 name 转组件路径
    static transformRouteNameToComponentPath(name: string) {
        return `/src/views/${ name.replaceAll('_', '/') }/index.vue`
    }

    // 排序路由, 默认升序
    static sortRoutes(routes: Route.RouteRecordRaw[], type: Sort) {
        routes.sort((a, b) => {
            if (type === Sort.Ascending) return Number(a.meta?.orderNo) - Number(b.meta?.orderNo)
            if (type === Sort.Descending) return Number(b.meta?.orderNo) - Number(a.meta?.orderNo)
            return 0
        })
    }

    // 删除空 Layout
    static removeEmptyLayout(routes: Route.RouteRecordRaw[]) {
        return routes.reduce<Route.RouteRecordRaw[]>((routes, route) => {
            if (route.children?.length) route.children = this.removeEmptyLayout(route.children)
            if (route.component === 'Layout' && !route.children?.length) return routes
            routes.push(route)
            return routes
        }, [])
    }

    // 重定向到首页
    static redirectToHomepage() {
        router.push(Settings.homePath)
    }
}