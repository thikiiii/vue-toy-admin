import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const dynamicGuard = async (
    to: RouteLocationNormalized,
    form: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<boolean> => {
    return true
}