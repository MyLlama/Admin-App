import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import 'vuetify/styles'
import './assets/icons/style.css'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
