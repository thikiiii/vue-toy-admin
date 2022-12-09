import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { initThemeState } from '@/store/modules/theme/theme'
import { ThemeStorage } from '@/storage/theme'
import { ThemeModeEnum } from '@/enums/theme'
import { setCSSVariable } from '@/utils'


// 主题
export const useThemeStore = defineStore('theme', {
    state: (): Store.ThemeStore => initThemeState,
    getters: {
        // 当前主题覆盖
        currentThemeOverrides: (themeStore) => themeStore.naive[themeStore.themeMode],

        // 组件库主题类型
        naiveThemeType: (themeStore) => themeStore.themeMode === 'dark' ? darkTheme : null
    },
    actions: {
        // 初始化主题
        initTheme() {
            this.setTheme(ThemeStorage.getTheme() || this.themeMode)
        },
        // 切换主题
        toggleTheme() {
            const type = this.themeMode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT
            this.themeMode = type
            this.setTheme(type)
        },
        // 设置主题
        setTheme(themeType: ThemeModeEnum) {
            const body = document.body
            // 去除过渡效果
            body.classList.add('noTransition')
            this.themeMode = themeType
            // 在 storage 中存储主题类型
            ThemeStorage.setTheme(themeType)
            const theme = this.customize[themeType]
            setCSSVariable(theme)
            setTimeout(() => body.classList.remove('noTransition'))
        }
    }
})
