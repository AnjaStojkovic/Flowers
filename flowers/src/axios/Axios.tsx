import axios from "axios";
import { logout } from "../services/Auth";
import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

var Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

Axios.interceptors.request.use(
  async function success(config) {
    const jwt = window.localStorage["jwt"];
    if (jwt) {
      const decoded = jwtDecode(jwt);
      console.log(Date.now());
      if (decoded.exp && decoded.exp < Date.now()) {
        alert("Jwt has expired");
        await logout();
        return Promise.reject(new Error("JWT expired"));
      }
      config.headers["Authorization"] = "Bearer " + jwt;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function success(response) {
    return response;
  },
  function failure(error) {
    let jwt = window.localStorage["jwt"];
    if (jwt) {
      if (error.response && error.response.status == 403) {
        logout();
      }
    }

    throw error;
  }
);

export default Axios;
