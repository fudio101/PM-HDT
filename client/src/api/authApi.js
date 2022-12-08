import axiosClient from "./axiosClient";

const authApi = {
    signup: (name, email, password, passwordConfirmation) =>
        axiosClient.post("/auth/register", {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        }),
};

export default authApi;
