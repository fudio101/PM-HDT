import axiosClient from "./axiosClient";

const comicApi = {
    search: (keywork) =>
        axiosClient.get("/search/comics", {
            params: {
                search: keywork,
            },
        }),
};

export default comicApi;
