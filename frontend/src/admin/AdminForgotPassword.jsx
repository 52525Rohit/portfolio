import { useState } from "react";
import { forgotPassword } from "../services/authService";
import Toast from "../components/Toast";

export default function AdminForgotPassword() {
  const [toast, setToast] = useState(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const data = new FormData(e.currentTarget);
    try {
      await forgotPassword(data.get("email"));
      setSent(true);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Something went wrong" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-auth">
      <form className="admin-auth__card" onSubmit={onSubmit}>
        <h1>Forgot Password</h1>
        {sent ? (
          <p className="admin-auth__note">
            If that email is registered, a reset link is on its way — check your inbox.
          </p>
        ) : (
          <>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <button type="submit" className="btn btn--primary" disabled={busy}>
              {busy ? "Sending…" : "Send Reset Link"}
            </button>
          </>
        )}
        <a href="/admin/login" className="admin-auth__link">
          Back to login
        </a>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
