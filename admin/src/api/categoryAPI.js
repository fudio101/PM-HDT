import axiosClient from "./axiosClient";

const categoryAPI = {
  getAll: () => {
    const url = "http://server-pmhdt/api/categories";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `http://server-pmhdt/api/categories/${id}`;
    return axiosClient.get(url);
  },

  store: (category) => {
    const url = `http://server-pmhdt/api/categories`;
    return axiosClient({
      url: url,
      method: "post",
      data: category,
    });
  },

  delete: (id) => {
    const url = `http://server-pmhdt/api/categories/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, category) => {
    const url = `http://server-pmhdt/api/categories/${id}`;
    return axiosClient({
      url: url,
      method: "put",
      data: category,
    });
  },
};

export default categoryAPI;
