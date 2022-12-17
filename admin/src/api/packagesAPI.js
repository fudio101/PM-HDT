import axiosClient from "./axiosClient";

const packagesAPI = {
  getAll: () => {
    return axiosClient.get("/subscription-packages");
  },
  get: (id) => {
    return axiosClient.get(`/subscription-packages/${id}`);
  },
  store: (subscription_package) => {
    return axiosClient.post("/subscription-packages", subscription_package);
  },
  update: (id, subscription_package) => {
    return axiosClient.post(
      `/subscription-packages/${id}?_method=PUT`,
      subscription_package
    );
  },
  destroy: (id) => {
    return axiosClient.delete(`/subscription-packages/${id}`);
  },
};

export default packagesAPI;
