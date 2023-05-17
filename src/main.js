import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/app.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faCalendarDays, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faCalendarDays, faEllipsisVertical, faXmark)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
