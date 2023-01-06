import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import '@/assets/index'
import { setupStore } from '@/store'
import { setupDiscreteApi } from '@/plugIn/naiveUi/discreteApi'
import setupGlobalDirectives from '@/directives'

const app = createApp(App)

const bootStart = async () => {

    // 挂载状态管理
    setupStore(app)

    // setup 外使用 useDialog、useMessage、useNotification、useLoadingBar
    setupDiscreteApi()

    // 挂载全局指令
    setupGlobalDirectives()

    // 挂载路由
    await setupRouter(app)

    // 必须在应用配置加载完成后调用
    app.mount('#app', true)

}

void bootStart()


