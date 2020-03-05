import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import NavTop from '@/components/NavTop'
import NavBottom from '@/components/NavBottom'

Vue.component('NavTop', NavTop)
Vue.component('NavBottom', NavBottom)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('Logout')
        }
        return Promise.reject(error)
      }

    )
  },
  render: h => h(App)
}).$mount('#app')