import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia() // 👈 crea pinia
app.use(pinia)              // 👈 REGÍSTRALA ANTES DE USAR STORES

app.mount('#app')

