import type { Router } from 'vue-router'
import useAuthStore from '@/store/modules/auth'


// 白名单
const whitePath = [ '/login' ]
export const createGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        console.log(from)
        const authStore = useAuthStore()
        
        if (to.path === '/login' && authStore.token) {
            console.log(from.path)
            return next(from.path)
        } else {
            next()
        }
    })
}