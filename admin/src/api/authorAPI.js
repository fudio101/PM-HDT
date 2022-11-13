import axiosClient from "./axiosClient";

const authorAPI = {
  getAll: () => {
    const url = "http://server-pmhdt/api/authors";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `http://server-pmhdt/api/authors/${id}`;

    return axiosClient.get(url);
  },

  store: (author) => {
    const url = `http://server-pmhdt/api/authors`;
    return axiosClient({
      url: url,
      method: "post",
      data: author,
    });
  },

  delete: (id) => {
    const url = `http://server-pmhdt/api/authors/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, author) => {
    const url = `http://server-pmhdt/api/authors/${id}?_method=PUT`;

    return axiosClient({
      url: url,
      method: "post",
      data: author,
    });
  },
};

export default authorAPI;
