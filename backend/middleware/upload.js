import multer from "multer";
import path from "path";

const ALLOWED = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(
      ALLOWED.has(ext) ? null : new Error("Unsupported file type"),
      ALLOWED.has(ext),
    );
  },
});
