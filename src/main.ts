// Style global
import '@/style/index.css'

// Vue
import App from './App.vue'
import { createApp } from 'vue'
const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
app.use(createPinia())

// Router
import router from './router'
app.use(router)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives
})
app.use(vuetify)

// MDI icons
import '@mdi/font/css/materialdesignicons.css'

app.mount('#app')
