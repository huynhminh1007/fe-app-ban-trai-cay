import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Response interceptor
 * Backend trả về:
 * {
 *   code: 200,
 *   message: "...",
 *   data: {...}
 * }
 */
axiosClient.interceptors.response.use(
  (response) => {
    const apiResponse = response.data;

    if (apiResponse?.code !== 200) {
      return Promise.reject(apiResponse);
    }

    return apiResponse;
  },
  (error) => {
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
