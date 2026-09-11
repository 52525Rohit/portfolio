export function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded, or file type not allowed" });
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url });
}
