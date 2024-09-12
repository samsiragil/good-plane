import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'

// Bootstrap
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


const app = createApp(App)

// pinia config
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(createBootstrap())

app.mount('#app')
