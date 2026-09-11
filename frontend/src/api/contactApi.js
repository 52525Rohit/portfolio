import { apiClient } from "./client";

export const contactApi = {
  send: (payload) => apiClient.post("/api/contact", payload),
};
