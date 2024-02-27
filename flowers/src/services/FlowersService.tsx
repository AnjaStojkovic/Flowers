import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "./Auth";

const FlowersService = {
  getFlowers: (page: number) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers?page=${page}`;
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

  postFavoriteFlower: (flowerId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flowerId}/favorites`;
    const authToken = getAuthToken();
    return axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while posting the favorite flower");
        throw error;
      });
  },

  deleteFavoriteFlower: (flowerId: any, id: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flowerId}/favorites/${id}`;
    const authToken = getAuthToken();
    return axios
      .delete(url, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while deleting the flower");
        throw error;
      });
  },
};

export default FlowersService;
