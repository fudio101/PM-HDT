import axiosClient from "./axiosClient";

const globalApi = {
    categoryList: () => axiosClient.get("/categories"),
    countryList: () => axiosClient.get("/countries"),
};

export default globalApi;
