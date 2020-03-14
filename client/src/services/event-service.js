import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8082"
  // headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  // }
});

export default {
  //ADMIN COMMANDS
  createDay(data) {
    return apiClient.post("/admin/days", data);
  },

  createDivision(data, dayId) {
    return apiClient.post(`/admin/days/${dayId}/divisions`, data);
  },

  createTeam(data, dayId, divisionId) {
    return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams`, data)
  },
  //APP INFO
  getDays() {
    return apiClient.get("/admin/days");
  },
  getDivisions(someId) {
    return apiClient.get(`/admin/days/${someId}/divisions`)
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
  addPlayer(dayId, divisionId, teamId, data) {
    // console.log(data)
    return apiClient.post(`/admin/days/${dayId}/divisions/${divisionId}/teams/${teamId}/teamPlayers`, data)
      .then(res => {
        return {
          res: res,
          hasError: false
        }
      })
      .catch(err => {
        return {
          err: err,
          hasError: true
        }
      })
  }
};