import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import SvgIcon from 'vue-svgicon'

import '@/shared/ui/BaseIcon/compiled-icons'

Vue.use(SvgIcon, {
  tagName: 'svgicon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
