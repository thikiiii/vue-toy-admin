import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/store/modules/route'
import { MenuOption } from 'naive-ui'

interface State {
    secondaryMenus: MenuOption[]
    activeIndex: number,
    isLeave: boolean
}

const state: State = reactive({
    secondaryMenus: [],
    activeIndex: 0,
    isLeave: false
})
export const useMixSide = () => {
    const route = useRoute()
    const routeStore = useRouteStore()
    const findActiveIndex = (menu: Store.MenuOption[]) => {
        return menu.findIndex(item => {
            if (item.key === route.path) return true
            if (item.children) {
                const index = findActiveIndex(item.children)
                if (index !== -1) return true
            }
        })
    }

    onMounted(() => {
        state.activeIndex = findActiveIndex(routeStore.menus)
        state.secondaryMenus = routeStore.menus[state.activeIndex].children || []
    })

    watch(() => state.isLeave, (isLeave) => {
        if (isLeave) {
            state.activeIndex = findActiveIndex(routeStore.menus)
        }
    })

    return { state, findActiveIndex }
}