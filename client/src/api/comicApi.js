import axiosClient from "./axiosClient";

const comicApi = {
    search: (keywork) =>
        axiosClient.get("/search/comics", {
            params: {
                search: keywork,
            },
        }),
    getComic: (slug) => axiosClient.get(`/comics/${slug}`),
};

export default comicApi;
