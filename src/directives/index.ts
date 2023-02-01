// 全局指令
import { App } from 'vue'

const setupGlobalDirectives = (app:App<Element>) => {
    const directives = import.meta.glob('./modules/**.ts', { eager: true })
    Object.keys(directives).forEach(key => (directives[key] as any).default(app))
}

export default setupGlobalDirectives
