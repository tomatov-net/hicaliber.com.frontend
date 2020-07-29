import axios from "axios";

let axiosInstance;
if (axiosInstance === undefined) {
  axiosInstance = axios.create({
    baseURL: process.env["VUE_APP_API_BASE_URL"],
    withCredentials: false
  });
}

export default axiosInstance;
