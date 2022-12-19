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

  getTotalView: () => {
    const url = "/get-total-views";
    return axiosClient.get(url);
  },

  getTotalIncome: () => {
    const url = "get-total-incomes";
    return axiosClient.get(url);
  },

  getTotalIncomeByMonth: (limit) => {
    const url = `/get-total-income-by-months?${limit}`;
    return axiosClient.get(url);
  },

  getUserStatistic: () => {
    const url = "/get-user-statistic";
    return axiosClient.get(url);
  },

  packageSold: () => {
    const url = "/get-subscription-package-statistic";
    return axiosClient.get(url);
  },
};

export default statisticAPI;
