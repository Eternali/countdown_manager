import Vue from 'vue'
import Vuetify from 'vuetify'
import VueMediaQueryMixin from 'vue-media-query-mixin'
import VueRouter from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'mdi/css/materialdesignicons.min.css'

// import '@/styles/debug.css';
import '@/styles/themes.styl'
import store from '@/store.js'
import App from '@/App.vue'
import Home from '@/components/Home.vue'
import AddEdit from '@/components/AddEdit.vue'

Vue.use(VueRouter)
Vue.use(routerHistory)

// currently I have to replicate this for both javascript and css use
Vue.use(
  Vuetify,
  {
    theme: {
      primary: '#00796b',
      secondary: '#b71c1c',
      accent: '#ff8f00',
      background: '#212121',
      error: '#d81b60',
      titleOnDark: '#f0f0f0',
      titleOnLight: '#0f0f0f',
      subtitleOnDark: '#ababab',
      subtitleOnLight: '#646464',
      bodyOnDark: '#e0e0e0',
      bodyOnLight: '#1a1a1a',
      darkBg: '#222222',
      lightBg: '#dddddd',
    }
  }
)

// So I can use screen breakpoints in code
// (although I should be able to do this with just Vuetify)
Vue.use(
  VueMediaQueryMixin,
  {
    framework: 'vuetify',
  }
)

Vue.config.productionTip = false

// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/home', component: Home },
    { path: '/addedit', component: AddEdit },
    { path: '*', redirect: '/home' },
  ]
})
router.afterEach(writeHistory)

let app = new Vue({
  router,
  store,
  data() {
    return {
      copyYear: 2018,
      author: 'Conrad Heidebrecht',
      gradients: require('./assets/gradients.json'),
    }
  },
  render: (h) => h(App)
})
app.$mount('#app')
