import { get } from "../AxiosInstance";

export const getAllFeedbacks = () => {
  return get("/feedbackadmin/list");
};