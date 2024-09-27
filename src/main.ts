import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vuetify);
app.use(router)
app.use(createPinia())

app.mount('#app')
