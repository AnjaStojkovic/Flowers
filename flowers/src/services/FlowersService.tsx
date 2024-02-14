import axios, { AxiosResponse } from "axios";

const FlowersService = {
  getFlowers: () => {
    const url = "https://flowrspot-api.herokuapp.com/api/v1/flowers";
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading flowers");
        throw error;
      });
  },
};

export default FlowersService;
