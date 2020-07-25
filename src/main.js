import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from '../node_modules/moment'


import './assets/css/tailwind.css'
import './assets/fonts/Inter/inter.css'

import { createProvider } from './vue-apollo'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  moment,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
