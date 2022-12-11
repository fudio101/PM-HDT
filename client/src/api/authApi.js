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

  resendCode: () => {
    const url = "/auth/resend-verify-code";
    axiosClient({
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
      },
      method: "post",
    });
    axiosClient({});
  },
  verify: (code) => {
    const url = "/auth/verify-registration";
    axiosClient({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
      },
      url: url,
      code: code,
      method: "post",
    });
  },
};

export default authApi;
