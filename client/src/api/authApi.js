import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

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

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
    function (response) {
        if (response.data && response.data.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    function (error) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            toast.error(error.response.data.message);
        }
    }
);

export default authApi;
