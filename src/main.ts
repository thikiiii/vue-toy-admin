import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.less'
import { solveStyleConflict } from '@/plugins/naive'

const app = createApp(App)

app.use(router)

solveStyleConflict()
app.mount('#app', true)