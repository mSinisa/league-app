import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8082"
});

export default {
  //ADMIN
  getDays() {
    return apiClient.get("/admin/days");
  },
  getAllDivisions(){
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
  //TEAM
  createTeam(data, dayId, divisionId) {
    return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams`, data)
  },


  
  //APP INFO
  getDivisions(dayId) {
    return apiClient.get(`/admin/days/${dayId}/divisions`)
  },
  getTeams(dayId, divisionId) {
    return apiClient.get(`/admin/days/${dayId}/divisions/${divisionId}/teams`)
  },
  getTeam(dayId, divisionId, teamId) {
    return apiClient.get(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}`)
  },
  getDivision(dayId, divisionId) {
    return apiClient.get(`/admin/days/${dayId}/divisions/${divisionId}`)
  },
  getAllPlayers() {
    return apiClient.get('/admin')
  },
  //add player to team
  addPlayer(dayId, divisionId, teamId, playerId) {
    return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}/teamPlayers`, playerId)
  },
  removeTeamPlayer(dayId, divisionId, teamId, playerId) {
    return apiClient.delete(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}/teamPlayers/${playerId}`)
  }
};