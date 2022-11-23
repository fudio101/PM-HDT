import axiosClient from "./axiosClient";

const categoryApi = {
    index: () =>
        axiosClient.get("/categories"),
};

export default categoryApi;
