import useAuthStore from "@/store/modules/auth";
import { useRouteStore } from "@/store/modules/route";
import { LOGIN_PATH } from "@/router/fixedRoute";
import { AuthCookie } from "@/storage/auth";
import { RouteAuthMode } from "@/enums/auth";
import { runTacticsAction } from "@/utils";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

// 守卫策略
const guardTactics = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { isLogin, isAuth, initUserStore, getUserinfo } = useAuthStore()
    const { initRouteStore, initFrontRouteAuth, routeAuthMode, hasInitAuthRoute } = useRouteStore()

    // 处理路由鉴权模式
    const handleRouteAuthMode = () => {
        switch (routeAuthMode) {
            // 前端路由鉴权模式
            case RouteAuthMode.FRONT:
                // 初始化路由
                initFrontRouteAuth()
                break
            // 服务端路由鉴权模式
            case RouteAuthMode.SERVER:
                next()
                break
        }
    }
    // 策略守卫
    const guardTacticsAction: TacticsAction[] = [
        // 未登录跳转到登录页面
        [
            !isLogin,
            () => {
                to.path === LOGIN_PATH ? next() : next(LOGIN_PATH)
            }
        ],
        // 登录的情况下在 cookie 中获取不到 token
        [
            !Boolean(AuthCookie.getToken()),
            () => {
                window.$message?.warning('令牌已失效，请重新登录！')
                initUserStore()
                initRouteStore()
                next(LOGIN_PATH)
            }
        ],
        // 没有鉴权（没有用户信息和角色）
        [
            !isAuth,
            async () => {
                // 初始化路由
                initRouteStore()
                // 获取用户信息
                await getUserinfo().catch(() => {
                    initUserStore()
                    next(LOGIN_PATH)
                    return Promise.reject()
                })
                /* -- 获取到了用户信息和角色 -- */
                handleRouteAuthMode()
                next({ ...to, replace: true })
            }
        ],
        // 没有初始化鉴权路由
        [
            !hasInitAuthRoute,
            () => {
                initRouteStore()
                handleRouteAuthMode()
                next({ ...to, replace: true })
            }
        ],
        // 登录情况下不能到登录页面
        [
            to.path === LOGIN_PATH,
            () => next(from.fullPath)
        ],
        // 走到这步直接通过（走到这步就表示已经登录、有权限、有路由了）
        [
            true,
            () => next()
        ]
    ];

    runTacticsAction(guardTacticsAction);
}

export default guardTactics