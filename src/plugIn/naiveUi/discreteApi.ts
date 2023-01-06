import { ConfigProviderProps, createDiscreteApi } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
import { DiscreteApi } from 'naive-ui/es/discrete/src/interface'
import { computed } from 'vue'

// setup 外使用 useDialog、useMessage、useNotification、useLoadingBar
export let discreteApi: DiscreteApi

export const setupDiscreteApi = () => {
    const themeStore = useThemeStore()
    const configProviderProps = computed<ConfigProviderProps>(() => ({
        themeOverrides: themeStore.currentThemeOverrides,
        theme: themeStore.naiveThemeType
    }))
    discreteApi = createDiscreteApi([ 'message', 'dialog', 'notification', 'loadingBar' ], {
        configProviderProps
    })
}
