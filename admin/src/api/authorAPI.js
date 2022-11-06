import axiosClient from "./axiosClient";

const authorAPI = {
  getAll: () => {
    const url = "http://server-pmhdt/api/authors";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `http://server-pmhdt/api/authors/${id}`;

    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  },

  store: (author) => {
    const url = `http://server-pmhdt/api/authors`;

    return axiosClient.post(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  },

  delete: (id) => {
    const url = `http://server-pmhdt/api/authors/${id}`;

    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  },

  update: (id, author) => {
    const url = `http://server-pmhdt/api/authors/${id}`;

    return axiosClient.put(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  },
};

export default authorAPI;
