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
  //APP INFO
  getDays() {
    return apiClient.get("/admin/days");
  }
};
