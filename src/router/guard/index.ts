import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { runTacticsAction } from '@/utils'
import { useTitle } from '@vueuse/core'
import { AuthCookie } from '@/storage/auth'

export const createGuard = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar?.start()
        const authStore = useAuthStore()
        // 是否登录
        const isLogin = Boolean(authStore.token) && Boolean(authStore.roles.length)
        // 是否忽略权限
        const isIgnoreAuth = Boolean(to.meta.ignoreAuth)
        const loginPath = '/login'
        
        const guardTacticsAction: TacticsAction[] = [
            // token 失效
            [
                isLogin && !Boolean(AuthCookie.getToken()),
                () => {
                    window.$message?.warning('令牌已失效，请重新登录！')
                    authStore.init()
                    next(loginPath)
                }
            ],
            // 登录状态到登录页面
            [
                isLogin && to.path === loginPath,
                () => {
                    next(from.fullPath)
                }
            ],
            // 登录状态或者无权限页面直接通过
            [
                isLogin || isIgnoreAuth,
                () => {
                    next()
                }
            ],
            // 未登录进入权限页面
            [
                !isLogin || !isIgnoreAuth,
                () => {
                    window.$message?.warning('请登录后访问！')
                    next(loginPath)
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