import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "./helpers/ScrollToTop";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./redux/store";
import axiosClient from "./api/axiosClient";
import { logout } from "./redux/reducers/userSlice";

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ScrollToTop />
                    <App />
                    <ToastContainer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
