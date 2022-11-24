import axiosClient from "./axiosClient";

const comicApi = {
    search: (keywork) =>
        axiosClient.get("get-comic/search", {
            params: {
                search: keywork,
            },
        }),
    getComic: (slug) => axiosClient.get(`get-comic/${slug}`),
    getNewComic: (number) =>
        axiosClient.get("get-comic/get-just-updated-comics", {
            params: {
                number: number,
            },
        }),
};

export default comicApi;
