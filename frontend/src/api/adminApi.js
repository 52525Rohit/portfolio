import { apiClient } from "./client";

export const adminApi = {
  login: (payload) => apiClient.post("/api/admin/login", payload),
  forgotPassword: (email) => apiClient.post("/api/admin/forgot-password", { email }),
  resetPassword: (payload) => apiClient.post("/api/admin/reset-password", payload),
};
