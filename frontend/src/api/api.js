//export const API_URL = "http://localhost:5000";

export const API_URL = "https://portfolio-qo1c.onrender.com";

// Uploads are stored as "/api/uploads/<name>" (older ones as full backend URLs).
// Always point them at the current backend so a domain change never breaks them.
export const fileUrl = (u) =>
  u?.includes("/api/uploads/") ? API_URL + u.slice(u.indexOf("/api/uploads/")) : u;
