import { useState } from "react";
import { resetPassword } from "../services/authService";
import Toast from "../components/Toast";

export default function AdminResetPassword() {
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const token = new URLSearchParams(window.location.search).get("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newPassword = data.get("newPassword");
    const confirmPassword = data.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match" });
      return;
    }

    setBusy(true);
    try {
      await resetPassword({ token, newPassword, confirmPassword });
      setToast({ type: "success", message: "Password updated — redirecting to login…" });
      setTimeout(() => (window.location.href = "/admin/login"), 1500);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Reset failed" });
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="admin-auth">
        <div className="admin-auth__card">
          <h1>Reset Password</h1>
          <p className="admin-auth__note">
            This link is missing its reset token. Request a new one from the{" "}
            <a href="/admin/forgot-password">forgot password</a> page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-auth">
      <form className="admin-auth__card" onSubmit={onSubmit}>
        <h1>Reset Password</h1>
        <label className="field">
          <span>New Password</span>
          <input name="newPassword" type="password" required minLength={8} placeholder="••••••••" />
        </label>
        <label className="field">
          <span>Confirm Password</span>
          <input name="confirmPassword" type="password" required minLength={8} placeholder="••••••••" />
        </label>
        <button type="submit" className="btn btn--primary" disabled={busy}>
          {busy ? "Updating…" : "Update Password"}
        </button>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
