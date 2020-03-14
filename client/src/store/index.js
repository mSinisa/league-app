import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import services from '../services/event-service'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    days: null,
    divisions: null,
    teams: null,
    //Team show
    team: null,
    division: null,
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
    SET_DIVISIONS(state, divisionsData) {
      state.divisions = divisionsData
    },
    SET_TEAMS(state, teamsData) {
      state.teams = teamsData
    },
    SET_TEAM(state, teamData) {
      // state.team = teamData
      Vue.set(state, 'team', teamData)
    },
    SET_DIVISION(state, divisionData) {
      state.division = divisionData
    },
    SET_ALL_PLAYERS(state, playersData) {
      state.allPlayers = playersData
    },
    UPDATE_TEAM(state, updatedTeamData) {
      console.log('team in state: ' + JSON.stringify(state.team))
      console.log('updatedTeam: ' + JSON.stringify(updatedTeamData))
      // state.team = updatedTeamData
      Vue.set(state, 'team', updatedTeamData)
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
        console.log(JSON.parse(JSON.stringify(res.data)) + 'days res obj') //same as below
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
          // console.log(responseObj.divisions + 'divisions response')
          commit('SET_DIVISIONS', responseObj)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTeams({
      commit
    }, {
      dayId,
      divisionId
    }) {
      console.log("ids from fetchTeams: " + dayId, divisionId)
      services.getTeams(dayId, divisionId)
        .then(res => {
          let responseObj = JSON.parse(JSON.stringify(res.data))
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
    fetchDivision({
      commit
    }, {
      dayId,
      divisionId
    }) {
      services.getDivision(dayId, divisionId)
        .then(res => {
          commit('SET_DIVISION', res.data)
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
          if (!res.hasError) {
            let updatedTeam = JSON.parse(JSON.stringify(res.res.data.updatedTeam))
            // console.log(updatedTeam)
            // commit('UPDATE_TEAM', updatedTeam)
            commit('SET_TEAM', updatedTeam)
          } else {
            console.log(res)
          }
        })
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  },
  modules: {}
});