import { useState } from "react";

// Generic editor for an array of flat objects (skills, stats, socials) —
// avoids hand-building a bespoke form per section for what's really the same shape.
export default function ListEditor({ title, items, fields, onChange, onSaveAll }) {
  const [saving, setSaving] = useState(false);
  const [removingIdx, setRemovingIdx] = useState(null);

  const update = (i, key, value) => {
    const next = items.slice();
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  const addRow = () => {
    const blank = Object.fromEntries(fields.map((f) => [f.key, ""]));
    onChange([...items, blank]);
  };

  // Number fields stay as whatever string the user typed (e.g. "1." while
  // entering "1.6") — coercing with Number() on every keystroke fights decimal
  // input, since "1." rounds to 1 and the input redraws minus the point.
  // Rows left completely untouched (e.g. an "+ Add" nobody filled in) are
  // dropped here rather than saved as blank junk.
  const prepare = (rows) =>
    rows
      .filter((row) => fields.some((f) => String(row[f.key] ?? "").trim() !== ""))
      .map((row) => {
        const out = { ...row };
        fields.forEach((f) => {
          if (f.type === "number") out[f.key] = Number(row[f.key]) || 0;
        });
        return out;
      });

  // No row-specific button survives a removal, so it has to persist immediately
  // rather than waiting for a separate Save click — same as the Projects editor.
  const removeRow = async (i) => {
    const next = items.filter((_, idx) => idx !== i);
    onChange(next);
    setRemovingIdx(i);
    try {
      await onSaveAll(prepare(next));
    } finally {
      setRemovingIdx(null);
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      await onSaveAll(prepare(items));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card__head">
        <h2>{title}</h2>
        <button type="button" className="btn btn--primary" onClick={saveAll} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      <div className="admin-list">
        {items.map((item, i) => (
          <div className="admin-list__row" key={item._id || `new-${i}`}>
            {fields.map((f) => (
              <input
                key={f.key}
                type={f.type === "number" ? "text" : f.type || "text"}
                inputMode={f.type === "number" ? "decimal" : undefined}
                value={item[f.key] ?? ""}
                placeholder={f.label}
                onChange={(e) => update(i, f.key, e.target.value)}
              />
            ))}
            <button
              type="button"
              className="admin-list__remove"
              onClick={() => removeRow(i)}
              disabled={removingIdx === i}
              aria-label={`Remove row ${i + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn--ghost admin-list__add" onClick={addRow}>
        + Add
      </button>
    </div>
  );
}
