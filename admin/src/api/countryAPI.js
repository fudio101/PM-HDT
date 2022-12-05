import axiosClient from "./axiosClient";

const userAPI = {
  getAll: () => {
    const url = "/countries";
    return axiosClient.get(url);
  },

  //   store: (user) => {
  //     const url = "/users";
  //     return axiosClient({
  //       url: url,
  //       method: "post",
  //       data: user,
  //     });
  //   },

  //   delete: (id) => {
  //     const url = `/users/${id}`;
  //     return axiosClient.delete(url);
  //   },

  //   update: (id, user) => {
  //     const url = `/users/${id}?_method=PUT`;
  //     return axiosClient({
  //       url: url,
  //       method: "post",
  //       data: user,
  //     });
  //   },
};

export default userAPI;
