import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8082'
});

export default {
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
    }
}