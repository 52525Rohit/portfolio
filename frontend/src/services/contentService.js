import { contentApi } from "../api/contentApi";

export const getContent = () => contentApi.get();
export const updateContent = (data) => contentApi.update(data);
export const uploadFile = (file) => contentApi.upload(file);
