import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // استيراد الراوتر
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router) // تفعيل الراوتر
app.mount('#app')