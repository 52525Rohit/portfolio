import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, 4000);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type}`} role="status">
      <span className="toast__icon" aria-hidden>
        {toast.type === "error" ? "!" : "✓"}
      </span>
      <span className="toast__msg">{toast.message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
