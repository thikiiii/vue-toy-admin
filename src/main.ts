import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import '@/assets/index'
import { setupStore } from '@/store'

const app = createApp(App)

const bootStart = async () => {

    // 挂载状态管理
    setupStore(app)

    // 挂载路由
    await setupRouter(app)

    // 必须在应用配置加载完成后调用
    app.mount('#app', true)

}

void bootStart()


