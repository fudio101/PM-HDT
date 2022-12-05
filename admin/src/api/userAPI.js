import axiosClient from "./axiosClient";

const userAPI = {
  getAll: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  store: (user) => {
    const url = "/users";
    return axiosClient({
      url: url,
      method: "post",
      data: user,
    });
  },

  delete: (id) => {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, user) => {
    const url = `/users/${id}?_method=PUT`;
    return axiosClient({
      url: url,
      method: "post",
      data: user,
    });
  },

  logout: () => {
    const url = `/auth/logout`;
    return axiosClient.post(url);
  },

  me: () => {
    const url = `/auth/me`;
    return axiosClient.get(url);
  },
};

export default userAPI;
