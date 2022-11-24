import axiosClient from "./axiosClient";

const comicAPI = {
  getAll: () => {
    const url = "http://server-pmhdt/api/comics";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `http://server-pmhdt/api/comics/${id}`;
    return axiosClient.get(url);
  },

  store: (comic) => {
    const url = `http://server-pmhdt/api/comics`;
    return axiosClient({
      url: url,
      method: "post",
      data: comic,
    });
  },

  delete: (id) => {
    const url = `http://server-pmhdt/api/comics/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, comic) => {
    const url = `http://server-pmhdt/api/comics/${id}`;

    return axiosClient({
      url: url,
      method: "put",
      data: comic,
    });
  },

  newChapter: (photos) => {
    const url = `http://server-pmhdt/api/comic-episodes`;
    return axiosClient({
      url: url,
      method: "post",
      data: photos,
    });
  },
};

export default comicAPI;
