import { useEffect, useState } from "react";
import { getContent, updateContent } from "../services/contentService";
import { isLoggedIn, logout } from "../services/authService";
import Toast from "../components/Toast";

export default function AdminDashboard() {
  const [json, setJson] = useState("");
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/admin/login";
      return;
    }
    getContent()
      .then((data) => setJson(JSON.stringify(data, null, 2)))
      .catch((err) => setToast({ type: "error", message: err.message }));
  }, []);

  if (!isLoggedIn()) return null;

  const onSave = async () => {
    let parsed;
    try {
      parsed = JSON.parse(json);
    } catch {
      setToast({ type: "error", message: "That's not valid JSON — check for a stray comma or quote." });
      return;
    }
    setBusy(true);
    try {
      const saved = await updateContent(parsed);
      setJson(JSON.stringify(saved, null, 2));
      setToast({ type: "success", message: "Saved — live on the site now." });
    } catch (err) {
      if (/authenticat|token/i.test(err.message)) {
        logout();
        window.location.href = "/admin/login";
        return;
      }
      setToast({ type: "error", message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const onLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-dash">
      <div className="admin-dash__bar">
        <h1>Portfolio Content</h1>
        <div className="admin-dash__actions">
          <button type="button" className="btn btn--primary" onClick={onSave} disabled={busy}>
            {busy ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
      <p className="admin-dash__hint">
        Edit the JSON below — it maps directly to the site's nav, tech chips, stats, skills,
        projects and social links. Save writes straight to the live site.
      </p>
      <textarea
        className="admin-dash__editor"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        spellCheck={false}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
