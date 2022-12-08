// api/axiosClient.js
import axios from "axios";
// import queryString from "query-string";
// Set up default config for http requests here

const axiosClient = axios.create({
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    // },
    // paramsSerializer: (params) => queryString.stringify(params),
    baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
});

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
    function (config) {
        // Làm gì đó trước khi request dược gửi đi
        return config;
    },
    function (error) {
        // Làm gì đó với lỗi request
        return Promise.reject(error);
    }
);

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
    function (response) {
        // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
        // Làm gì đó với dữ liệu response
        return response;
    },
    function (error) {
        // if (error.response) {
        //     // Request đã được tạo ra và server đã hồi đáp với một mã trạng thái
        //     // nằm ra ngoài tầm 2xx
        //     // console.log(error.response.data);
        //     // console.log(error.response.status);
        //     // console.log(error.response.headers);
        // } else if (error.request) {
        //     // Request đã được tạo ra nhưng không nhận được hồi đáp nào
        //     // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
        //     // còn trong node.js thì nó là instance của http.ClientRequest
        //     console.log(error.request);
        // } else {
        //     // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        //     console.log("Lỗi", error.message);
        // }
        // console.log(error.config);
        return Promise.reject(error);
    }
);
export default axiosClient;
