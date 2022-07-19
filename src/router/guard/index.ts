import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { useTitle } from '@vueuse/core'
import { LOGIN_PATH } from '@/router/fixedRoute'
import { useRouteStore } from '@/store/modules/route'
import { AuthCookie } from '@/storage/auth'

export const createGuard = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        window.$loadingBar?.start()
        const { isLogin, isAuth, initUserStore, getUserinfo } = useAuthStore()
        const { initRouteStore, addAuthRoues } = useRouteStore()

        // 是否忽略权限
        const ignoreAuth = Boolean(to.meta.ignoreAuth)

        // 登录
        if (!isLogin) {
            return ignoreAuth ? next() : next(LOGIN_PATH)
        }
        if (!Boolean(AuthCookie.getToken())) {
            window.$message?.warning('令牌已失效，请重新登录！')
            initUserStore()
            initRouteStore()
            return next(LOGIN_PATH)
        }
        // 登录
        if (isAuth) {
            to.path === LOGIN_PATH ? next(from.fullPath) : next()
        } else {
            initRouteStore()
            await getUserinfo().catch(() => {
                initUserStore()
                next(LOGIN_PATH)
                return Promise.reject()
            })
            addAuthRoues()
            next(to.path)
        }

        // const guardTacticsAction: TacticsAction[] = [
        //     // token 失效
        //     [
        //         isLogin && !Boolean(AuthCookie.getToken()),
        //         () => {
        //             window.$message?.warning('令牌已失效，请重新登录！')
        //             initUserStore()
        //             next(LOGIN_PATH)
        //         }
        //     ],
        //     // 登录状态到登录页面
        //     [
        //         isLogin && to.path === LOGIN_PATH,
        //         () => {
        //             next(from.fullPath)
        //         }
        //     ],
        //     // 登录状态且有权限的情况下进入无权限页面直接通过
        //     [
        //         (isLogin && isAuth) || ignoreAuth,
        //         () => {
        //             next()
        //         }
        //     ],
        //     // 未登录进入权限页面
        //     [
        //         !isLogin || !ignoreAuth,
        //         () => {
        //             window.$message?.warning('请登录后在访问！')
        //             next(LOGIN_PATH)
        //         }
        //     ],
        //     // 不登陆的状态
        //     [
        //         !isLogin,
        //         () => {
        //             to.path === LOGIN_PATH ? next() : next(LOGIN_PATH)
        //         }
        //     ]
        // ]
        // runTacticsAction(guardTacticsAction)
    })
    router.afterEach((to) => {
        useTitle(to.meta.title)
        window.$loadingBar?.finish()
    })
}