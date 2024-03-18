import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.56.1:8081/",
  withCredentials: true,
});
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8081/",
//   withCredentials: true,
// });