import { jwtDecode } from "jwt-decode";
import axios from "../axios/Axios";
import { setUserId } from "../store/user-slice";
import { closePopup } from "../store/popup-slice";

interface FormData {
  email: string;
  password: string;
}

interface JwtData {
  exp: number;
  user_id: number;
}

export const login = async function (userData: FormData) {
  const data = {
    email: userData.email,
    password: userData.password,
  };
  try {
    const ret = await axios.post("/api/v1/users/login", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = ret.data.auth_token;
    const decodedToken: JwtData = jwtDecode(token);
    const userId = decodedToken.user_id;
    localStorage.setItem("jwt", token);
    window.location.assign("/");
    return userId;
  } catch (error) {}
};

export const logout = function () {
  localStorage.removeItem("jwt");
  window.location.assign("/");
};

export const isAuthenticated = () => {
  const jwt = localStorage.getItem("jwt");
  return !!jwt;
};

export const getAuthToken = () => {
  const jwt = localStorage.getItem("jwt");
  return jwt ? `Bearer ${jwt}` : "";
};
