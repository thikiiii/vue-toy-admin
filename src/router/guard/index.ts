import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import guardTactics from '@/router/guard/guardTactics'
import { discreteApi } from '@/plugIn/naiveUi/discreteApi'

export const createGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        discreteApi.loadingBar.start()
        guardTactics(to, from, next)
    })

    router.afterEach(to => {
        useTitle(to.meta.title)
        discreteApi.loadingBar.finish()
    })
}
