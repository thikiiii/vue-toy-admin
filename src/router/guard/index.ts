import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { runTacticsAction } from '@/utils'
import { useTitle } from '@vueuse/core'
import { AuthCookie } from '@/storage/auth'

export const createGuard = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar?.start()
        const loginPath = '/login'
        const { isLogin, hasAuth, initUserStore, getUserinfo } = useAuthStore()
        // 是否忽略权限
        const ignoreAuth = Boolean(to.meta.ignoreAuth)

        if (isLogin && !hasAuth) {
            await getUserinfo().catch(() => {
                initUserStore()
                next(loginPath)
                return Promise.reject()
            })
            return next(to.path)
        }
        const guardTacticsAction: TacticsAction[] = [
            // token 失效
            [
                isLogin && !Boolean(AuthCookie.getToken()),
                () => {
                    window.$message?.warning('令牌已失效，请重新登录！')
                    initUserStore()
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
                (isLogin && hasAuth) || ignoreAuth,
                () => {
                    next()
                }
            ],
            // 未登录进入权限页面
            [
                !isLogin || !ignoreAuth,
                () => {
                    window.$message?.warning('请登录后在访问！')
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