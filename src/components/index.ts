import Icon from '@/components/Icon/icon.vue'
import { App } from 'vue'

const components = [ Icon ]
// 注册全局组件
export const setupGlobalComponent = (app: App) => {
    components.forEach(component => app.component(component.name, component))
}