export const pathForId = (id) => (id === "home" ? "/" : `/${id}`);
export const idForPath = (pathname) => pathname.replace(/^\/+/, "") || "home";
