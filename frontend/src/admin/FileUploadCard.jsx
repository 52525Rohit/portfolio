import { useState } from "react";
import { uploadFile, updateContent } from "../services/contentService";

// Uploads immediately on file pick and saves the resulting URL straight to
// that one field — no separate "Save" step needed for a single file swap.
export default function FileUploadCard({ title, field, accept, isImage, value, onSaved, onError }) {
  const [busy, setBusy] = useState(false);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadFile(file);
      await updateContent({ [field]: url });
      onSaved(url);
    } catch (err) {
      onError(err.message || "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__head">
        <h2>{title}</h2>
      </div>
      <div className="admin-upload">
        {isImage ? (
          <img src={value} alt="" className="admin-upload__preview" />
        ) : (
          <a href={value} target="_blank" rel="noreferrer" className="admin-upload__file">
            PDF
          </a>
        )}
        <div className="admin-upload__body">
          <input type="file" accept={accept} onChange={onFileChange} disabled={busy} />
          {busy && <span className="admin-dash__hint">Uploading…</span>}
        </div>
      </div>
    </div>
  );
}
