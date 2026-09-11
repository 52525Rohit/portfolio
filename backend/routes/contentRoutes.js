import { Router } from "express";
import { getContent, updateContent } from "../controllers/contentController.js";
import { uploadFile } from "../controllers/uploadController.js";
import requireAuth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getContent);
router.put("/", requireAuth, updateContent);
router.post("/upload", requireAuth, upload.single("file"), uploadFile);

export default router;
