import axiosClient from "./axiosClient";

const comicApi = {
    search: (keywork) =>
        axiosClient.get("/search", {
            params: {
                search: keywork,
            },
        }),
    getComic: (slug) => axiosClient.get(`/${slug}`),
    getNewComic: (number) =>
        axiosClient.get("get-just-updated-comics", {
            params: {
                number: number,
            },
        }),
};

export default comicApi;
