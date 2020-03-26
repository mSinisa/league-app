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
        // divisions: null,
        // teams: null,
        //Team show
        // team: null,
        // division: null,
        // allPlayers: null,
        // backendErrorMessage: null
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



        SET_DIVISIONS(state, divisionsData) {
            state.divisions = divisionsData
        },
        SET_TEAMS(state, teamsData) {
            state.teams = teamsData
        },
        SET_TEAM(state, teamData) {
            state.team = teamData
        },
        SET_DIVISION(state, divisionData) {
            state.division = divisionData
        },
        SET_ALL_PLAYERS(state, playersData) {
            state.allPlayers = playersData
        },
        SET_BACKEND_ERR_MESSAGE(state, errMessage) {
            state.backendErrorMessage = errMessage
        },
        DELETE_BACKEND_MESSAGE(state) {
            state.backendErrorMessage = null
        }
    },
    actions: {
        register({ commit }, credentials) {
            return axios
                .post("//localhost:8082/register", credentials)
                .then(({ data }) => {
                    commit("SET_USER_DATA", data);
                });
        },
        login({ commit }, credentials) {
            return axios
                .post("//localhost:8082/login", credentials)
                .then(({ data }) => {
                    commit("SET_USER_DATA", data);
                });
        },
        logout({
            commit
        }) {
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
        // fetchDivisions({
        //     commit
        // }, dayId) {
        //     services.getDivisions(dayId)
        //         .then(res => {
        //             let responseObj = JSON.parse(JSON.stringify(res.data.divisions))
        //             // console.log(responseObj.divisions + 'divisions response')
        //             commit('SET_DIVISIONS', responseObj)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        // fetchDivision({
        //     commit
        // }, {
        //     dayId,
        //     divisionId
        // }) {
        //     services.getDivision(dayId, divisionId)
        //         .then(res => {
        //             console.log(res.data)
        //             commit('SET_DIVISION', res.data.division)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        createDivision({
            commit,
            dispatch
        }, {
            dayId,
            data
        }) {
            services.createDivision(data, dayId).then(res => {
                    let responseDivisions = JSON.parse(JSON.stringify(res.data.divisions))
                    commit('SET_DIVISIONS', responseDivisions)
                    dispatch('notification/add', res.data.notification, {
                        root: true
                    })
                    router.push({
                        name: 'AdminHome'
                    })
                })
                .catch(err => {
                    console.log(err)
                    // let errMessageArr = err.message.split(' ')
                    // let errNumber = errMessageArr[errMessageArr.length - 1]
                    // if (errNumber == 409) {
                    let notification = {
                        message: `There was a problem creating division`,
                        type: 'error'
                    }
                    dispatch('notification/add', notification, {
                        root: true
                    })
                    // }
                })
        },
        editDivision({
            commit,
            dispatch
        }, {
            dayId,
            divisionId,
        }) {},
        deleteDivision({
            commit,
            dispatch
        }, {
            dayId,
            divisionId
        }) {
            services.deleteDivision(dayId, divisionId)
                .then(res => {
                    let responseDivisions = JSON.parse(JSON.stringify(res.data.updatedDivisions))
                    commit('SET_DIVISIONS', responseDivisions)
                    dispatch('notification/add', res.data.notification, {
                        root: true
                    })
                })
                .catch(err => {
                    let notification = {
                        type: 'error',
                        message: 'There was a problem when deleting division'
                    }
                    dispatch('notification/add', notification, {
                        root: true
                    })
                })
        },

        // ---------------------------- TEAMS -----------------------------------
        fetchTeams({
            commit
        }, {
            dayId,
            divisionId
        }) {
            // console.log("ids from fetchTeams: " + dayId, divisionId)
            services.getTeams(dayId, divisionId)
                .then(res => {
                    let responseObj = JSON.parse(JSON.stringify(res.data.teams))
                    commit('SET_TEAMS', responseObj)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTeam({
            commit
        }, {
            dayId,
            divisionId,
            teamId
        }) {
            console.log('ids from fetchTeam: ' + teamId)
            services.getTeam(dayId, divisionId, teamId)
                .then(res => {
                    // let responseObj = JSON.parse(JSON.stringify(res.data))
                    let responseObj = JSON.parse(JSON.stringify(res.data.team))
                    commit('SET_TEAM', responseObj)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchAllPlayers({
            commit
        }) {
            services.getAllPlayers()
                .then(res => {
                    let responseObj = JSON.parse(JSON.stringify(res.data))
                    commit('SET_ALL_PLAYERS', responseObj)
                })
        },
        addTeamPlayer({
            commit
        }, {
            dayId,
            divisionId,
            teamId,
            playerId
        }) {
            services.addPlayer(dayId, divisionId, teamId, {
                    _id: playerId
                })
                .then(res => {
                    let updatedTeam = JSON.parse(JSON.stringify(res.data.updatedTeam))
                    commit('SET_TEAM', updatedTeam)
                })
                .catch(err => {
                    console.log('err: ' + err)
                    //err msg from back end
                    let errArrLength = err.message.split(' ').length
                    let errNum = err.message.split(' ')[errArrLength - 1]
                    if (errNum == 409) {
                        let errMessage = 'This player is already in the team'
                        commit('SET_BACKEND_ERR_MESSAGE', errMessage)
                    } else {
                        console.log(`new err: ${err}`)
                    }
                })
        },
        deleteBackendErrorMessage({
            commit
        }) {
            commit('DELETE_BACKEND_MESSAGE')
        },

        removeTeamPlayer({
            commit
        }, {
            dayId,
            divisionId,
            teamId,
            playerId
        }) {
            console.log(playerId + ' player id')
            services.removeTeamPlayer(dayId, divisionId, teamId, playerId).then(res => {
                    let updatedTeam = JSON.parse(JSON.stringify(res.data.updatedTeam))
                    console.log(updatedTeam)
                    commit('SET_TEAM', updatedTeam)
                })
                .catch(err => {
                    console.log(`err in delete: ${err}`)
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