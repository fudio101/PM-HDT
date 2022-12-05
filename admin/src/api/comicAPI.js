import axiosClient from "./axiosClient";

const comicAPI = {
  getAll: () => {
    const url = "/comics";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/comics/${id}`;
    return axiosClient.get(url);
  },

  store: (comic) => {
    const url = `/comics`;
    return axiosClient({
      url: url,
      method: "post",
      data: comic,
    });
  },

  delete: (id) => {
    const url = `/comics/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, comic) => {
    const url = `/comics/${id}?_method=PUT`;

    return axiosClient({
      url: url,
      method: "post",
      data: comic,
    });
  },
};

export default comicAPI;
