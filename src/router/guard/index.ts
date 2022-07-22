import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { useTitle } from '@vueuse/core'
import { LOGIN_PATH } from '@/router/fixedRoute'
import { useRouteStore } from '@/store/modules/route'
import { AuthCookie } from '@/storage/auth'
import { runTacticsAction } from '@/utils'

export const createGuard = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
            window.$loadingBar?.start()
            const { isLogin, isAuth, initUserStore, getUserinfo } = useAuthStore()
            const { initRouteStore, addAuthRoues } = useRouteStore()

            // 是否忽略权限
            const ignoreAuth = Boolean(to.meta.ignoreAuth)

            // 策略守卫
            const guardTacticsAction: TacticsAction[] = [
                // 无权限页面直接通过
                [
                    ignoreAuth,
                    () => next()
                ],
                // 未登录跳转到登录页面
                [
                    !isLogin,
                    () => {
                        next(LOGIN_PATH)
                    }
                ],
                // 登录的情况下获取不到 token
                [
                    !Boolean(AuthCookie.getToken()),
                    () => {
                        window.$message?.warning('令牌已失效，请重新登录！')
                        initUserStore()
                        initRouteStore()
                        next(LOGIN_PATH)
                    }
                ],
                // 登录后且有权限
                [
                    isAuth,
                    () => to.path === LOGIN_PATH ? next(from.fullPath) : next()
                ]
            ]
            const isSuccess = runTacticsAction(guardTacticsAction)
            if (isSuccess) return
            // 登录后且无权限
            initRouteStore()
            await getUserinfo().catch(() => {
                initUserStore()
                next(LOGIN_PATH)
                return Promise.reject()
            })
            addAuthRoues()
            next(to.path)
        }
    )
    router.afterEach((to) => {
        useTitle(to.meta.title)
        window.$loadingBar?.finish()
    })
}