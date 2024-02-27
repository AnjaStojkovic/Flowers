import axios, { AxiosResponse } from "axios";
import { FormData } from "../modules/Sighting/Comments";
import { getAuthToken } from "./Auth";

const CommentsService = {
  getComments: (page: number, sightingId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sightingId}/comments?page=${page}`;
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading the comments");
        throw error;
      });
  },

  postComment: (formData: FormData, sightingId: any) => {
    const url = `https://flowrspot-api.herokuapp.com//api/v1/sightings/${sightingId}/comments`;
    const authToken = getAuthToken();
    return axios
      .post(url, formData, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while adding the comment");
        throw error;
      });
  },

  deleteComment: (sightingId: number, id: number) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sightingId}/comments/${id}`;
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
        alert("An error occurred while deleting the sighting");
        throw error;
      });
  },
};

export default CommentsService;
