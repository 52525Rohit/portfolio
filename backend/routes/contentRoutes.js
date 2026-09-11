import { Router } from "express";
import { getContent, updateContent } from "../controllers/contentController.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

router.get("/", getContent);
router.put("/", requireAuth, updateContent);

export default router;
