import axiosClient from "./axiosClient";

const comicApi = {
    search: (keywork) =>
        axiosClient.get("/search", {
            params: {
                search: keywork,
            },
        }),
    getComic: (slug) => axiosClient.get(`/${slug}`),
    getNewComic: () => axiosClient.get("get-just-updated-comics"),
};

export default comicApi;
