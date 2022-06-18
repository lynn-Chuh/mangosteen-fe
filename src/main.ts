import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { App } from './App'
import { routes } from './config/routes'
import { history } from './utils/history'

import 'normalize.css'

const router = createRouter({ routes,history })

const app = createApp(App)

app.use(router)
app.mount('#app')