import { createRouter, createWebHashHistory } from 'vue-router'
import { fixedRoute } from '@/router/fixedRoute'
import type { App } from 'vue'
import { createGuard } from '@/router/guard'

const router = createRouter({
    history: createWebHashHistory(),
    routes: fixedRoute
})

export const setupRouter = async (app: App<Element>) => {
    app.use(router)
    createGuard(router)
    await router.isReady()
}

export default router



