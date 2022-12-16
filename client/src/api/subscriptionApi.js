import axiosClient from "./axiosClient";

const subscriptionApi = {
    getSubscriptionPackages: () => axiosClient.get(`subscription-packages`),
    buySubscriptionPackage: (subscriptionPackageId) =>
        axiosClient.post(
            `buy-subscription-package/${subscriptionPackageId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "_userToken"
                    )}`,
                },
            }
        ),
};

export default subscriptionApi;
