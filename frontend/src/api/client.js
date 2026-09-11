import { API_URL } from "../config";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const apiClient = {
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};
