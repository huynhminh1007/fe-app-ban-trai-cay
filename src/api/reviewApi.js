import axiosClient from "./axiosClient";

export const getReviews = (productId, params) => {
  return axiosClient.get(`/reviews/${productId}`, {
    params,
  });
};
