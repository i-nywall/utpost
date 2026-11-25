import urql from '@urql/vue'
import { client } from './urql'

import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(urql, client)

app.mount('#app')
