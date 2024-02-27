import axios from "axios";
import { logout } from "../services/Auth";
import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { closePopup } from "../store/popup-slice";

var Axios = axios.create({
  baseURL: "https://flowrspot-api.herokuapp.com",
  headers: {},
});

Axios.interceptors.request.use(
  async (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decoded = jwtDecode(jwt);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        try {
          const refreshedToken = await refreshAccessToken();
          config.headers["Authorization"] = "Bearer " + refreshedToken;
          config.headers["Content-Type"] = "application/json";
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          await logout();
          return Promise.reject(refreshError);
        }
      } else {
        config.headers["Authorization"] = "Bearer " + jwt;
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://flowrspot-api.herokuapp.com/api/v1/users/me/refresh"
    );
    const refreshedToken = response.data.auth_token;
    localStorage.setItem("jwt", refreshedToken);
    return refreshedToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function failure(error) {
    let jwt = localStorage["jwt"];
    if (jwt) {
      if (error.response && error.response.status == 403) {
        logout();
      }
    }

    throw error;
  }
);

export default Axios;
