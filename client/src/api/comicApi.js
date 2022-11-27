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
};

export default comicApi;
