import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  
  return createPortal(
    <div className="resume-modal__backdrop" onClick={onClose}>
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal__bar">
          <span>Resume</span>
          <div className="resume-modal__actions">
            <a
              href="/resume.pdf"
              download="Rohit-Kumar-Resume.pdf"
              className="btn btn--primary"
            >
              Download <span aria-hidden>↓</span>
            </a>
            <button
              type="button"
              className="resume-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <iframe src="/resume.pdf" title="Resume preview" className="resume-modal__frame" />
      </div>
    </div>,
    document.body
  );
}
