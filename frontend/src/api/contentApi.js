import { apiClient } from "./client";

export const contentApi = {
  get: () => apiClient.get("/api/content"),
  update: (payload) => apiClient.put("/api/content", payload),
};
