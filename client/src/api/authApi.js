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
};

export default authApi;
