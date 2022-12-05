import axiosClient from "./axiosClient";

const statisticAPI = {
  topComics: () => {
    const url = "/get-view-statistics?limit=5";
    return axiosClient.get(url);
  },

  viewByMonth: (limit) => {
    const url = `/get-total-views-by-months?${limit}`;
    return axiosClient.get(url);
  },
};

export default statisticAPI;
