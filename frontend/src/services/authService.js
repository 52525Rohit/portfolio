import { adminApi } from "../api/adminApi";

const TOKEN_KEY = "admin_token";

export const isLoggedIn = () => Boolean(localStorage.getItem(TOKEN_KEY));

export async function login(email, password) {
  const { token } = await adminApi.login({ email, password });
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export const forgotPassword = (email) => adminApi.forgotPassword(email);
export const resetPassword = (payload) => adminApi.resetPassword(payload);
