import Content from "../models/Content.js";

export async function getContent(req, res) {
  const content = await Content.findById("site").lean();
  res.json(content || {});
}

export async function updateContent(req, res) {
  const body = { ...(req.body || {}) };
  delete body._id;
  const updated = await Content.findByIdAndUpdate(
    "site",
    { $set: body },
    { new: true, upsert: true, runValidators: true },
  );
  res.json(updated);
}
