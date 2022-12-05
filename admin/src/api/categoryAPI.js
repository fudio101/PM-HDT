import axiosClient from "./axiosClient";

const categoryAPI = {
  getAll: () => {
    const url = "/categories";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  store: (category) => {
    const url = `/categories`;
    return axiosClient({
      url: url,
      method: "post",
      data: category,
    });
  },

  delete: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, category) => {
    const url = `/categories/${id}`;
    return axiosClient({
      url: url,
      method: "put",
      data: category,
    });
  },
};

export default categoryAPI;
