import axiosClient from "./axiosClient";

const comicEpAPI = {
  getComicEp: (id) => {
    const url = `/comic-episodes/${id}`;
    return axiosClient.get(url);
  },

  newChapter: (photos) => {
    const url = `/comic-episodes`;
    return axiosClient({
      url: url,
      method: "post",
      data: photos,
    });
  },

  updateComicEP: (id, photos) => {
    const url = `/comic-episodes/${id}?_method=PUT`;
    return axiosClient({
      url: url,
      method: "post",
      data: photos,
    });
  },

  deleteComiCEP: (id) => {
    const url = `/comic-episodes/${id}`;
    return axiosClient.delete(url);
  },
};

export default comicEpAPI;
