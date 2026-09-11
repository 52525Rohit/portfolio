import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../services/authService";
import Toast from "../components/Toast";

export default function AdminLogin() {
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const data = new FormData(e.currentTarget);
    try {
      await login(data.get("email"), data.get("password"));
      window.location.href = "/admin";
    } catch (err) {
      setToast({ type: "error", message: err.message || "Login failed" });
      setBusy(false);
    }
  };

  return (
    <div
      className="admin-auth"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        className="admin-auth__card"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Admin Login</h1>

        <label className="field" style={{ width: "100%", textAlign: "left" }}>
          <span>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            style={{ width: "100%" }}
          />
        </label>

        <label className="field" style={{ width: "100%", textAlign: "left" }}>
          <span>Password</span>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                paddingRight: "36px",
                boxSizing: "border-box",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={busy}
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {busy ? "Signing in…" : "Sign In"}
        </button>
        <a href="/admin/forgot-password" className="admin-auth__link">
          Forgot password?
        </a>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
