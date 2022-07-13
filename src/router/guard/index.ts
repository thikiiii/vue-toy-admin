import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { runTacticsAction } from '@/utils'
import { useTitle } from '@vueuse/core'

/**
 * 1、固定路由、无权限直接进
 *  登录成功 直接 next
 *  不登录的状态跳转到登录页
 *
 * */
export const createGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        window.$loadingBar?.start()
        const authStore = useAuthStore()
        // 是否登录
        const isLogin = Boolean(authStore.token)
        // 是否忽略权限
        const isIgnoreAuth = Boolean(to.meta.ignoreAuth)
        const loginPath = '/login'
        const guardTacticsAction: TacticsAction[] = [
            // 登录状态到登录页面
            [
                isLogin && to.path === loginPath,
                () => {
                    next(from.fullPath)
                }
            ],
            // 登录
            [
                isLogin || isIgnoreAuth,
                () => {
                    next()
                }
            ],
            // 不登陆的状态
            [
                !isLogin,
                () => {
                    to.path === loginPath ? next() : next(loginPath)
                }
            ]
        ]
        runTacticsAction(guardTacticsAction)
    })
    router.afterEach((to) => {
        useTitle(to.meta.title)
        window.$loadingBar?.finish()
    })
}