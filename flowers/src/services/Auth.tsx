import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface FormData {
  email: string;
  password: string;
}

export const login = async function (userData: FormData) {
  const data = {
    email: userData.email,
    password: userData.password,
  };
  try {
    const ret = await axios.post("/token", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = ret.data;
    const decodedToken = jwtDecode(token);
    //const role = decodedToken.role.authority;
    //window.localStorage.setItem("role", role);
    window.localStorage.setItem("jwt", token);
  } catch (error) {
    console.log(error);
  }
  window.location.assign("/");
};

export const logout = function () {
  window.localStorage.removeItem("jwt");
  // window.localStorage.removeItem("role");
  window.location.assign("/");
};

export const isAuthenticated = () => {
  const jwt = window.localStorage.getItem("jwt");
  return !!jwt;
};

export const getAuthToken = () => {
  const jwt = window.localStorage.getItem("jwt");
  return jwt
    ? `Bearer ${jwt}`
    : "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJOYW1lSWRlbnRpZmllciI6IjExIiwiVXNlcm5hbWUiOiJEcmFnYW5hIiwiUm9sZSI6IkFkbWluIiwibmJmIjoxNzA2MjgzMTg0LCJleHAiOjE3MDYzMDExODQsImlhdCI6MTcwNjI4MzE4NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Oi8ifQ.8O_bqNrjoOcA92AKv83HRpfTbQYaW_aEz-qwxeBhxr8s3sZVN3rShTU_iElw8vaf9Yk-jFrpRhIGA0Wo-3czeQ";
};