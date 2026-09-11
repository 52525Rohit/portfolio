import { contentApi } from "../api/contentApi";

export const getContent = () => contentApi.get();
export const updateContent = (data) => contentApi.update(data);
