import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router'
import '@/styles/index.less'
import { setupStore } from '@/store'
import AppProvider from '@/components/AppProvider/index.vue'

const start = async () => {
    const appProvider = createApp(AppProvider)
    const app = createApp(App)

    //优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
    appProvider.mount('#appProvider', true)

    // 挂载路由
    setupRouter(app)

    // 挂载状态管理
    setupStore(app)

    // 路由准备就绪后挂载APP实例
    await router.isReady()
    app.mount('#app', true)
}
void start()
