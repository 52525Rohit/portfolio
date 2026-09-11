// Express 5 forwards rejected async route handlers here automatically.
export default function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
}
