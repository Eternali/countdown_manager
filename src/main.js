import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'mdi/css/materialdesignicons.min.css'

// import './styles/debug.css'
import './styles/themes.styl'
import store from './store'
import App from './App.vue'

// currently I have to replicate this for both javascript and css use
Vue.use(Vuetify, {
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
    inputOnDark: '#eeeeee',
    inputOnLight: '#111111',
    inputCard: '#212121',
    inputHover: '#656565',
    inputFocus: '#00796b'
  }
})

Vue.config.productionTip = false

// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'

new Vue({
  store,
  data() {
    return {
      gradients: require('./assets/gradients.json'),
    };
  },
  render: h => h(App)
}).$mount('#app')
