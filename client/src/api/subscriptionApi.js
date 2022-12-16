import axiosClient from "./axiosClient";

const subscriptionApi = {
    getSubscriptionPackages: () => axiosClient.get(`subscription-packages`),
};

export default subscriptionApi;
