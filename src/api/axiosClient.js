import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    "https://syndetically-indictable-noma.ngrok-free.dev/api/v1/caygiong.com",
  timeout: 15000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
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
    return Promise.reject(error.response?.data || error);
  },
);

export default axiosClient;
