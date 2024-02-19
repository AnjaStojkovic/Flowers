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

  getFavorites: (userId: any) => {
    const url = "https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites";
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading favorite flowers");
        throw error;
      });
  },

  getOneFlower: (flowerId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flowerId}`;
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading the flower");
        throw error;
      });
  },
};

export default FlowersService;
