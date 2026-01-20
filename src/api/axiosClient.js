import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 200) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    console.error("AXIOS ERROR:", error);

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      code: -1,
      message: "Không thể kết nối tới server",
    });
  },
);

export default axiosClient;
