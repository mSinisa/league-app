import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from '../router/index'
import services from '../services/event-service'
import * as notification from '@/store/modules/notification'
Vue.use(Vuex);
Vue.use(router)

export default new Vuex.Store({
    state: {
        user: null,
        days: null,
        allDivisions: null,
        allPlayers: null
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData;
            localStorage.setItem("user", JSON.stringify(userData));
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        },
        CLEAR_USER_DATA() {
            localStorage.removeItem("user");
            location.reload();
        },
        //ADMIN
        SET_DAYS(state, daysData) {
            state.days = daysData
        },
        SET_ALL_DIVISIONS(state, allDivisions) {
            state.allDivisions = allDivisions
        },
        ADD_DAY_TO_DAYS(state, newLeagueDay) {
            state.days.push(newLeagueDay)
        },
        DELETE_DAY_FROM_DAYS(state, deletedDay) {
            state.days = state.days.filter(day => day._id !== deletedDay._id)
        },
        UPDATE_DAY(state, updatedDay) {
            let indexOfDay = state.days.findIndex(day => day._id == updatedDay._id)
            state.days[indexOfDay] = updatedDay
        },
        DELETE_DIVISION_FROM_DIVISIONS(state, deletedDivision) {
            state.allDivisions = state.allDivisions.filter(division => division._id !== deletedDivision._id)
        },
        SET_ALL_PLAYERS(state, playersData) {
            state.allPlayers = playersData
        }
    },
    actions: {
        register({ commit }, credentials) {
            return axios.post("//localhost:8082/register", credentials)
                .then(({ data }) => {
                    commit("SET_USER_DATA", data);
                });
        },
        login({ commit }, credentials) {
            return axios.post("//localhost:8082/login", credentials)
                .then(({ data }) => {
                    commit("SET_USER_DATA", data);
                });
        },
        logout({ commit }) {
            commit("CLEAR_USER_DATA");
        },
        // ====================================   ADMIN ========================================
        // ------------------------------------   DAYS  -----------------------------------------
        getDays({ commit }) { 
            services.getDays()
                .then(res => commit('SET_DAYS', res.data.days))
                .catch(err => console.log(JSON.stringify(err.data)))
        },
        getAllDivisions({ commit }) {
            services.getAllDivisions()
                .then( res => commit('SET_ALL_DIVISIONS', res.data.allDivisions))
                .catch(err => console.log(JSON.stringify(err.response.status + ' ' + err.response.statusText)))
        },
        createLeagueDay({ commit, dispatch }, leagueName) {
            services.createLeagueDay(leagueName)
                .then(res => {
                    commit('ADD_DAY_TO_DAYS', res.data.newLeagueDay)
                    router.push({name: 'AdminHome'})
                    dispatch('notification/add', res.data.notification, {root: true})
                })
                .catch(err => console.log(err))
        },
        deleteLeagueDay({commit, dispatch}, dayId) {
            services.deleteLeagueDay(dayId)
            .then(res => {
                commit('DELETE_DAY_FROM_DAYS', res.data.deletedDay)
                dispatch('notification/add', res.data.notification, {root: true})
            })
            .catch(err => console.log(err))
        },
        // --------------------------------------     DIVISIONS ----------------------------------
        createDivision({ commit, dispatch }, { dayId, name }) {
            services.createDivision(name, dayId)
            .then(res => {
                commit('UPDATE_DAY', res.data.updatedDay)
                dispatch('notification/add', res.data.notification, { root: true})
                router.push({ name: 'AdminHome' })
            })
            .catch(err => console.log(err))
        },
        deleteDivision({ commit, dispatch }, { dayId, divisionId }) {
            services.deleteDivision(dayId, divisionId)
                .then(res => {
                    commit('UPDATE_DAY', res.data.updatedDay)
                    commit('DELETE_DIVISION_FROM_DIVISIONS', res.data.deletedDivision)
                    dispatch('notification/add', res.data.notification, { root: true })
                })
                .catch(err => {
                    let notification = {
                        type: 'error',
                        message: `There was a problem when deleting division: ${err} `
                    }
                    dispatch('notification/add', notification, {
                        root: true
                    })
                })
        },
        // -------------------------     PLAYERS    ------------------------------------
        getAllPlayers({ commit }) {
            services.getAllPlayers()
                .then(res => {
                    commit('SET_ALL_PLAYERS', res.data.allPlayers)
                })
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        },
        getDayById: state => dayId => {
            return state.days.find(day => JSON.stringify(day._id) === JSON.stringify(dayId))
        },
        getDivisionById: state => divisionId => {
            return state.allDivisions.find(division => JSON.stringify(division._id) === JSON.stringify(divisionId))
        }
    },
    modules: {
        notification
    }
});