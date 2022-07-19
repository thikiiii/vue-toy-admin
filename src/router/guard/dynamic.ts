import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useAuthStore from '@/store/modules/auth'
import { LOGIN_PATH } from '@/router/fixedRoute'
import { useRouteStore } from '@/store/modules/route'

export const dynamicGuard = async (
    to: RouteLocationNormalized,
    form: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<boolean> => {
    const { isLogin, isAuth, initUserStore, getUserinfo } = useAuthStore()
    const { initRouteStore } = useRouteStore()

    if (isLogin && !isAuth) {
        initRouteStore()
        await getUserinfo().catch(() => {
            initUserStore()
            next(LOGIN_PATH)
            return Promise.reject()
        })
        next(to.path)
        return true
    }
    return false
}