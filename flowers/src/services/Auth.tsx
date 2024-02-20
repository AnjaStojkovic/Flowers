import { jwtDecode } from "jwt-decode";
import axios from "../axios/Axios";

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
    console.log(ret, "response");

    const token = ret.data.auth_token;
    const decodedToken: JwtData = jwtDecode(token);
    console.log(decodedToken);
    const userId = decodedToken.user_id;
    //const role = decodedToken.role.authority;
    //window.localStorage.setItem("role", role);
    localStorage.setItem("jwt", token);
    console.log("Local storageee:", localStorage.getItem("jwt"));
    window.location.assign("/");
    return userId;
  } catch (error) {
    console.log(error);
  }
};

export const logout = function () {
  localStorage.removeItem("jwt");
  // window.localStorage.removeItem("role");
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
