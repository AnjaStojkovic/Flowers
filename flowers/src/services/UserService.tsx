import { AxiosResponse } from "axios";
import axios from "../axios/Axios";

import { FormData } from "../components/Forms/CreateAccount";
import { getAuthToken } from "./Auth";

const UserService = {
  createAccount: (formData: FormData) => {
    const url = "https://flowrspot-api.herokuapp.com//api/v1/users/register";
    return axios
      .post(url, formData)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while adding the user");
        throw error;
      });
  },

  getUserInfo: () => {
    const url = "https://flowrspot-api.herokuapp.com/api/v1/users/me";
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading information about the user");
        throw error;
      });
  },

  getUserSightings: (userId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/users/${userId}/sightings`;
    const authToken = getAuthToken();
    return axios
      .get(url, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading sightings");
        throw error;
      });
  },
};

export default UserService;
