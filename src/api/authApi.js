import axiosClient from "./axiosClient";

export const authApi = {
  login(data) {
    return axiosClient.post("/login", data);
  },
};
