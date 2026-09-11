import { useState } from "react";

// Editor for a flat array of strings (nav labels, tech chips) — a comma-separated
// input is all this needs; a full add/remove row UI would be overkill here.
//
// The typed text is kept as its own local state and only split into an array
// on Save — deriving the input's value from the array on every keystroke (as
// this used to) meant typing ", " (comma then space) trimmed and filtered that
// trailing space away immediately, so a space right after a comma never stuck.
export default function SimpleListEditor({ title, items, onSaveAll }) {
  const [text, setText] = useState(items.join(", "));
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const next = text.split(",").map((t) => t.trim()).filter(Boolean);
    setSaving(true);
    try {
      await onSaveAll(next);
      setText(next.join(", "));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__head">
        <h2>{title}</h2>
        <button type="button" className="btn btn--primary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      <div className="admin-list__row">
        <input value={text} placeholder="Comma separated" onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}
