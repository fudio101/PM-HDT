import axiosClient from "./axiosClient";

const comicApi = {
  search: (keywork) =>
    axiosClient.get("search", {
      params: {
        search: keywork,
      },
    }),
  getComic: (slug) => axiosClient.get(`get-comic/${slug}`),
  getNewComic: (number) =>
    axiosClient.get("get-just-updated-comics", {
      params: {
        number: number,
      },
    }),
  getComicByCategory: (categoryId) =>
    axiosClient.get(`get-comics-by-category/${categoryId}`),
  getViewStatisticsByDay: (day) =>
    axiosClient.get(`get-view-statistics-by-day?day=${day}`),
  getViewStatisticsByMonth: (month) =>
    axiosClient.get(`get-view-statistics-by-month?month=${month}`),
  getViewStatisticsAll: () => axiosClient.get(`get-view-statistics`),

  //rating API
  rating: (slug, rating) =>
    axiosClient.post(
      `/rate-comic/${slug}`,
      { rating: rating },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
        },
      }
    ),
};

export default comicApi;
