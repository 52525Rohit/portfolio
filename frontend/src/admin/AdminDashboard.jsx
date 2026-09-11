import { useEffect, useState } from "react";
import { getContent, updateContent } from "../services/contentService";
import { isLoggedIn, logout } from "../services/authService";
import Toast from "../components/Toast";
import FileUploadCard from "./FileUploadCard";
import ListEditor from "./ListEditor";
import SimpleListEditor from "./SimpleListEditor";
import ProjectsEditor from "./ProjectsEditor";

export default function AdminDashboard() {
  const [content, setContent] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/admin/login";
      return;
    }
    getContent()
      .then(setContent)
      .catch((err) => setToast({ type: "error", message: err.message }));
  }, []);

  if (!isLoggedIn()) return null;

  const showError = (message) => setToast({ type: "error", message });

  const patch = (key, value) => setContent((c) => ({ ...c, [key]: value }));

  // Callers always pass the array they just computed (e.g. after removing a
  // row) rather than this reading `content[key]` back, so a save can never
  // race React's async state update and resend stale data.
  const save = async (key, value) => {
    try {
      await updateContent({ [key]: value });
      patch(key, value);
      setToast({ type: "success", message: "Saved — live on the site now." });
    } catch (err) {
      showError(err.message);
    }
  };

  const onLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  if (!content) {
    return (
      <div className="admin-dash">
        <p className="admin-dash__hint">Loading…</p>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="admin-dash">
      <div className="admin-dash__bar">
        <h1>Portfolio Content</h1>
        <button type="button" className="btn btn--ghost" onClick={onLogout}>
          Log Out
        </button>
      </div>

      <div className="admin-grid">
        <FileUploadCard
          title="Profile Photo"
          field="profileImage"
          accept="image/*"
          isImage
          value={content.profileImage}
          onSaved={(url) => {
            patch("profileImage", url);
            setToast({ type: "success", message: "Photo updated — live on the site now." });
          }}
          onError={showError}
        />
        <FileUploadCard
          title="Resume (PDF)"
          field="resume"
          accept="application/pdf"
          value={content.resume}
          onSaved={(url) => {
            patch("resume", url);
            setToast({ type: "success", message: "Resume updated — live on the site now." });
          }}
          onError={showError}
        />
        <SimpleListEditor
          title="Nav Links"
          items={content.nav}
          onSaveAll={(v) => save("nav", v)}
        />
        <SimpleListEditor
          title="Tech Chips"
          items={content.tech}
          onSaveAll={(v) => save("tech", v)}
        />
        <ListEditor
          title="Stats"
          items={content.stats}
          fields={[
            { key: "value", label: "Value", type: "number" },
            { key: "suffix", label: "Suffix (+, %)" },
            { key: "label", label: "Label" },
          ]}
          onChange={(v) => patch("stats", v)}
          onSaveAll={(v) => save("stats", v)}
        />
        <ListEditor
          title="Skills"
          items={content.skills}
          fields={[
            { key: "name", label: "Skill name" },
            { key: "level", label: "Level (0-100)", type: "number" },
          ]}
          onChange={(v) => patch("skills", v)}
          onSaveAll={(v) => save("skills", v)}
        />
        <ListEditor
          title="Social Links"
          items={content.socials}
          fields={[
            { key: "label", label: "Label" },
            { key: "href", label: "URL" },
          ]}
          onChange={(v) => patch("socials", v)}
          onSaveAll={(v) => save("socials", v)}
        />
      </div>

      <div className="admin-grid admin-grid--wide">
        <ProjectsEditor
          items={content.projects}
          onChange={(v) => patch("projects", v)}
          onSaveAll={(v) => save("projects", v)}
          onError={showError}
        />
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
