import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import services from '../services/event-service'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    days: null,
    divisions: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA() {
      // state.user = null
      localStorage.removeItem("user");
      location.reload();
      // axios.defaults.headers.common.Authorization = null
    },

    //ADMIN
    SET_DAYS(state, daysData) {
      state.days = daysData
    },
    SET_DIVISIONS(state, divisionsData) {
      state.divisions = divisionsData
      // console.log('call from mutations: ' + state.divisions)
    },
    CLEAR_DIVISIONS(state) {
      state.divisions = null
    }
  },
  actions: {
    register({
      commit
    }, credentials) {
      return axios
        .post("//localhost:8082/register", credentials)
        .then(({
          data
        }) => {
          commit("SET_USER_DATA", data);
          console.log(data)
        });
    },
    login({
      commit
    }, credentials) {
      return axios
        .post("//localhost:8082/login", credentials)
        .then(({
          data
        }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({
      commit
    }) {
      commit("CLEAR_USER_DATA");
    },

    //ADMIN
    getDays({
      commit
    }) {
      services.getDays().then(res => {
        commit("SET_DAYS", res.data);
      }).catch(err => {
        console.log(err)
      })
    },
    fetchDivisions({
      commit
    }, dayId) {
      services.getDivisions(dayId)
        .then(res => {
          let responseObj = JSON.parse(JSON.stringify(res.data))
          console.log(responseObj)
          commit('SET_DIVISIONS', responseObj)
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearDivisions({
      commit
    }) {
      commit("CLEAR_DIVISIONS")
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  },
  modules: {}
});