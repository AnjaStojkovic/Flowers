import axios, { AxiosResponse } from "axios";

const UserService =  {

    createAccount: (formData: any) => {
        const url = 'https://flowrspot-api.herokuapp.com//api/v1/users/register';
        return axios.post(url, formData)
        .then((res: AxiosResponse) => { 
            return res.data})
        .catch((error: Error) => {
            alert("An error occurred while adding the user");
            throw error;
        });
    }
}

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
