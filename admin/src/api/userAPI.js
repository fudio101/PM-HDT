import axiosClient from "./axiosClient";

const userAPI = {
  getAll: () => {
    const url = "http://server-pmhdt/api/users";
    return axiosClient.get(url);
  },

  store: (user) => {
    const url = "http://server-pmhdt/api/users";
    return axiosClient({
      url: url,
      method: "post",
      data: user,
    });
  },

  delete: (id) => {
    const url = `http://server-pmhdt/api/users/${id}`;
    return axiosClient.delete(url);
  },

  update: (id, user) => {
    const url = `http://server-pmhdt/api/users/${id}?_method=PUT`;
    return axiosClient({
      url: url,
      method: "post",
      data: user,
    });
  },

  logout: () => {
    const url = `http://server-pmhdt/api/auth/logout`;
    return axiosClient.post(url);
  },

  me: () => {
    const url = `http://server-pmhdt/api/auth/me`;
    return axiosClient.get(url);
  },
};

export default userAPI;
