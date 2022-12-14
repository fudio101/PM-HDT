import axiosClient from "./axiosClient";

const authApi = {
  signup: (name, email, password, passwordConfirmation) =>
    axiosClient.post("/auth/register", {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }),
  forgotPassword: (email) =>
    axiosClient.post("/auth/forgot-password", {
      email: email,
    }),
  login: (email, password) =>
    axiosClient.post("/auth/login", {
      email: email,
      password: password,
    }),
  me: () =>
    axiosClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
      },
    }),

  resendCode: () =>
    axiosClient.post(
      "/auth/resend-verify-code",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
        },
      }
    ),

  verify: (code) => {
    axiosClient.post(
      "/auth/verify-registration",
      { code: code },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
        },
      }
    );
  },

  changePassword: (input) => {
    return axiosClient.post("/auth/change-password", input, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
      },
    });
  },

  changeUserInfo: (name) => {
    return axiosClient.put("/change-user-name", name, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
      },
    });
  },
};

export default authApi;
