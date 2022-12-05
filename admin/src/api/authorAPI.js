import axiosClient from "./axiosClient";

const authorAPI = {
  getAll: () => {
    const url = "/authors";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/authors/${id}`;

    return axiosClient.get(url);
  },

  store: (author) => {
    const url = `/authors`;
    return axiosClient({
      url: url,
      method: "post",
      data: author,
    });
  },

  delete: (id) => {
    const url = `/authors/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, author) => {
    const url = `/authors/${id}?_method=PUT`;

    return axiosClient({
      url: url,
      method: "post",
      data: author,
    });
  },
};

export default authorAPI;
