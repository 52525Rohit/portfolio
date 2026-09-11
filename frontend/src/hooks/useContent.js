import { useContext } from "react";
import { ContentContext } from "../context/contentDefaults";

export const useContent = () => useContext(ContentContext);
