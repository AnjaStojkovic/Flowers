import { getAuthToken } from "./Auth";
import axios, { AxiosResponse } from "axios";

const LikesService = {
  postLike: (sightingId: any) => {
    const url = `https://flowrspot-api.herokuapp.com//api/v1/sightings/${sightingId}/likes`;
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
        alert("An error occurred while adding the like");
        throw error;
      });
  },

  deleteLike: (sightingId: number) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sightingId}/likes`;
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
        alert("An error occurred");
        throw error;
      });
  },

  getLikesForOneSighting: (sightingId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sightingId}/likes`;
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading likes");
        throw error;
      });
  },
};

export default LikesService;
