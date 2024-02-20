//import axios, { AxiosResponse } from "axios";
import { AxiosResponse } from "axios";
import axios from "../axios/Axios";

import { FormData } from "../components/forms/CreateAccount";

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

  getUserInfo: (userId: any) => {
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
};

export default UserService;

// import axios, { AxiosResponse } from "axios";

// const UserService = {
//     createAccount: <T>(formData: FormData<T>) => {
//         const url = 'https://flowrspot-api.herokuapp.com/api/v1/users/register';
//         return axios.post(url, formData)
//             .then((res: AxiosResponse) => {
//                 return res.data;
//             })
//             .catch((error: Error) => {
//                 alert("An error occurred while adding the user");
//                 throw error;
//             });
//     }
// };

// export default UserService;
