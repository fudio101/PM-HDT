import axiosClient from "./axiosClient";

const receiptAPI = {
  getAll: () => {
    const url = "/bills";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/bills/${id}`;
    return axiosClient.get(url);
  },
};

export default receiptAPI;
