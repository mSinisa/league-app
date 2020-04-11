import axios from 'axios'
import store from '../store/index'
const apiClient = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
});

    apiClient.interceptors.response.use( 
        response => response,
        error => {
            if (error.response.status === 401) {
                store.dispatch('logout')
            }
            return Promise.reject(error)
        }
    )

export default {
    login(credentials) {
        return apiClient.post('/login', credentials)
    },
    register(credentials) {
        return apiClient.post('/register', credentials)
    },
    //ADMIN
    getDays() {
        return apiClient.get("/admin/days");
    },
    getAllDivisions() {
        return apiClient.get("admin/days/divisions")
    },
    //DAY
    createLeagueDay(data) {
        return apiClient.post('/admin/days', data);
    },
    deleteLeagueDay(dayId) {
        return apiClient.delete(`/admin/days/${dayId}`)
    },
    //DIVISION
    createDivision(name, dayId) {
        return apiClient.post(`/admin/days/${dayId}/divisions`, name)
    },
    deleteDivision(dayId, divisionId) {
        return apiClient.delete(`/admin/days/${dayId}/divisions/${divisionId}`)
    },
    transferTeamBetweenDivisions(dayId, teamId, currentDivisionId, divisionToTransferToId){
        return apiClient.put(`/admin/days/${dayId}/divisions`, {teamId, currentDivisionId, divisionToTransferToId})
    },
    //TEAM
    createTeam(data, dayId, divisionId) {
        return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams`, data)
    },
    getTeam(dayId, divisionId, teamId) {
        return apiClient.get(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}`)
    },
    deleteTeam(dayId, divisionId, teamId) {
        return apiClient.delete(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}`)
    },
    //PLAYERS
    getAllPlayers() {
        return apiClient.get('/admin/allPlayers')
    },
    addPlayer(dayId, divisionId, teamId, playerId) {
        return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}/teamPlayers`, {playerId})
    },
    removePlayer(dayId, divisionId, teamId, playerId) {
        return apiClient.delete(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}/teamPlayers/${playerId}`)
    },
    // TEST
    getEvents(){
        return apiClient.get('/about')
    }
}

export { apiClient }