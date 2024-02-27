import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "./Auth";
import { MyFormData } from "../components/Forms/SightingForm";

const SightingsService = {
  getSightings: (page: number) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings?page=${page}`;
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading sightings");
        throw error;
      });
  },

  getOneSighting: (sightingId: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sightingId}`;
    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error: Error) => {
        alert("An error occurred while loading the sighting");
        throw error;
      });
  },

  postSighting: (formData: FormData) => {
    const url = "https://flowrspot-api.herokuapp.com//api/v1/sightings";
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
        alert("An error occurred while adding the sighting");
        throw error;
      });
  },

  deleteSighting: (id: any) => {
    const url = `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}}`;
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

export default SightingsService;
