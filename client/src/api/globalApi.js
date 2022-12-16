import axiosClient from "./axiosClient";

const globalApi = {
    categoryList: () => axiosClient.get("/categories"),
    countryList: () => axiosClient.get("/countries"),
    vndToUsdRate: () =>
        axiosClient.get(
            "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/vnd/usd.json"
        ),
};

export default globalApi;
