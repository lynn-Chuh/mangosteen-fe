import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { App } from './App'
import { routes } from './config/routes'
import { history } from './utils/history'
import SvgIcon from './icons/index'

import 'normalize.css'
import vhCheck from 'vh-check'

vhCheck('browser-address-bar')

const router = createRouter({ routes,history })

const app = createApp(App)

app.component('SvgIcon', SvgIcon)
app.use(router)
app.mount('#app')