import path from "path";
import Upload from "../models/Upload.js";

export async function uploadFile(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded, or file type not allowed" });
  }
  const ext = path.extname(req.file.originalname).toLowerCase();
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  await Upload.create({
    _id: filename,
    contentType: req.file.mimetype,
    data: req.file.buffer,
  });
  const url = `${req.protocol}://${req.get("host")}/api/uploads/${filename}`;
  res.json({ url });
}

export async function serveUpload(req, res) {
  const file = await Upload.findById(req.params.name);
  if (!file) return res.status(404).send("File not found");
  res.set("Content-Type", file.contentType);
  res.set("Content-Disposition", "inline");
  res.set("Cache-Control", "public, max-age=31536000, immutable");
  res.send(file.data);
}
