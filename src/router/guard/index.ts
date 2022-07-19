import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { runTacticsAction } from '@/utils'
import { useTitle } from '@vueuse/core'
import { AuthCookie } from '@/storage/auth'
import { dynamicGuard } from '@/router/guard/dynamic'
import { LOGIN_PATH } from '@/router/fixedRoute'

export const createGuard = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar?.start()
        const { isLogin, isAuth, initUserStore } = useAuthStore()
        // 是否忽略权限
        const ignoreAuth = Boolean(to.meta.ignoreAuth)

        const isSuccess = await dynamicGuard(to, from, next)
        if (!isSuccess) return
        // if (isLogin && !isAuth) {
        //     await getUserinfo().catch(() => {
        //         initUserStore()
        //         next(LOGIN_PATH)
        //         return Promise.reject()
        //     })
        //     return next(to.path)
        // }
        const guardTacticsAction: TacticsAction[] = [
            // token 失效
            [
                isLogin && !Boolean(AuthCookie.getToken()),
                () => {
                    window.$message?.warning('令牌已失效，请重新登录！')
                    initUserStore()
                    next(LOGIN_PATH)
                }
            ],
            // 登录状态到登录页面
            [
                isLogin && to.path === LOGIN_PATH,
                () => {
                    next(from.fullPath)
                }
            ],
            // 登录状态或者无权限页面直接通过
            [
                (isLogin && isAuth) || ignoreAuth,
                () => {
                    next()
                }
            ],
            // 未登录进入权限页面
            [
                !isLogin || !ignoreAuth,
                () => {
                    window.$message?.warning('请登录后在访问！')
                    next(LOGIN_PATH)
                }
            ],
            // 不登陆的状态
            [
                !isLogin,
                () => {
                    to.path === LOGIN_PATH ? next() : next(LOGIN_PATH)
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