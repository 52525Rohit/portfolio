import { useState } from "react";
import { uploadFile } from "../services/contentService";

const BLANK = { no: "", title: "", desc: "", tags: [], link: "", thumb: "" };

export default function ProjectsEditor({ items, onChange, onSaveAll, onError }) {
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [savingIdx, setSavingIdx] = useState(null);

  const update = (i, key, value) => {
    const next = items.slice();
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  const onThumbChange = async (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIdx(i);
    try {
      const { url } = await uploadFile(file);
      update(i, "thumb", url);
    } catch (err) {
      onError(err.message || "Upload failed");
    } finally {
      setUploadingIdx(null);
      e.target.value = "";
    }
  };

  // The backend stores all projects as one array, so saving "one" project still
  // sends the whole array — but only that row's button shows the loading state.
  // The array is passed explicitly (not read back from parent state) so this
  // can't race React's async state update and resend stale data.
  const saveOne = async (i) => {
    setSavingIdx(i);
    try {
      await onSaveAll(prepare(items));
    } finally {
      setSavingIdx(null);
    }
  };

  const addProject = () => onChange([...items, { ...BLANK, no: String(items.length + 1).padStart(2, "0") }]);

  // An "+ Add project" nobody filled in shouldn't get saved as blank junk.
  const prepare = (rows) => rows.filter((p) => p.title.trim() || p.desc.trim() || p.link.trim());

  // Remove has no row left to click "Save" on afterward, so it persists immediately.
  const removeProject = async (i) => {
    const next = items.filter((_, idx) => idx !== i);
    onChange(next);
    setSavingIdx(i);
    try {
      await onSaveAll(prepare(next));
    } finally {
      setSavingIdx(null);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__head">
        <h2>Projects</h2>
      </div>
      <div className="admin-projects">
        {items.map((p, i) => (
          <div className="admin-project" key={p._id || `new-${i}`}>
            <div className="admin-project__thumb">
              {p.thumb && <img src={p.thumb} alt="" />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onThumbChange(i, e)}
                disabled={uploadingIdx === i}
              />
              {uploadingIdx === i && <span className="admin-dash__hint">Uploading…</span>}
            </div>
            <div className="admin-project__fields">
              <div className="admin-project__row">
                <input
                  value={p.no}
                  placeholder="No. (01)"
                  onChange={(e) => update(i, "no", e.target.value)}
                />
                <input
                  value={p.title}
                  placeholder="Title"
                  onChange={(e) => update(i, "title", e.target.value)}
                />
              </div>
              <textarea
                value={p.desc}
                placeholder="Description"
                onChange={(e) => update(i, "desc", e.target.value)}
              />
              <input
                value={p.link}
                placeholder="Live link (https://…)"
                onChange={(e) => update(i, "link", e.target.value)}
              />
              <input
                value={p.tags.join(", ")}
                placeholder="Tags, comma separated"
                onChange={(e) =>
                  update(
                    i,
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                  )
                }
              />
              <div className="admin-project__row">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => saveOne(i)}
                  disabled={savingIdx === i}
                >
                  {savingIdx === i ? "Saving…" : "Save"}
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => removeProject(i)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn--ghost admin-list__add" onClick={addProject}>
        + Add project
      </button>
    </div>
  );
}
