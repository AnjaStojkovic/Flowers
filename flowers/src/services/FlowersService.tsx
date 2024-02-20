import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "./Auth";

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

  getFavorites: (page: number) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites?page=${page}`;
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
        alert("An error occurred while loading favorite flowers");
        throw error;
      });
  },

  getSearchedFlowers: async (name: string) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers/search?query=${name}`;
    const authToken = getAuthToken();
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      alert("An error occurred while loading searched flowers");
      throw error;
    }
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
