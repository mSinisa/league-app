import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import NavTop from '@/components/NavTop'
import NavBottom from '@/components/NavBottom'
import NotificationContainer from '@/components/NotificationContainer'

Vue.component('NavTop', NavTop)
Vue.component('NavBottom', NavBottom)
Vue.component('NotificationContainer', NotificationContainer)

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
    },
    render: h => h(App)
}).$mount('#app')