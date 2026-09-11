import { API_URL } from "../config";

const TOKEN_KEY = "admin_token";

function authHeader() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...options.headers, ...authHeader() },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

const withJson = (body, options) => ({
  ...options,
  headers: { "Content-Type": "application/json", ...options?.headers },
  body: JSON.stringify(body),
});

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, withJson(body, { method: "POST" })),
  put: (path, body) => request(path, withJson(body, { method: "PUT" })),
  // FormData sets its own multipart Content-Type (with boundary) — never override it.
  postForm: (path, formData) => request(path, { method: "POST", body: formData }),
};
