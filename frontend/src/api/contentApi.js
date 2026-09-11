import { apiClient } from "./client";

export const contentApi = {
  get: () => apiClient.get("/api/content"),
  update: (payload) => apiClient.put("/api/content", payload),
  upload: (file) => {
    const form = new FormData();
    form.append("file", file);
    return apiClient.postForm("/api/content/upload", form);
  },
};
