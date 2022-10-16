import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import guardTactics from "@/router/guard/guardTactics";

export const createGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
            window.$loadingBar?.start()
            guardTactics(to, from, next)
        }
    )

    router.afterEach((to) => {
        useTitle(to.meta.title)
        window.$loadingBar?.finish()
    })
}