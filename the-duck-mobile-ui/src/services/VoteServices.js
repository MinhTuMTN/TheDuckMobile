import { get, post } from "./AxiosInstance";

export const getVotesByProductId = (productId) => {
  return get(`/vote?productId=${productId}`);
};

export const createVote = (productId, vote) => {
  return post(`/vote?productId=${productId}`, vote);
};
