import axios, { AxiosResponse } from "axios";

const SightingsService = {
  getSightings: () => {
    const url = "https://flowrspot-api.herokuapp.com/api/v1/sightings";
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
};

export default SightingsService;
