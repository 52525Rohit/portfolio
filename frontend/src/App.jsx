import Portfolio from "./Portfolio";
import AdminLogin from "./admin/AdminLogin";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminResetPassword from "./admin/AdminResetPassword";
import AdminDashboard from "./admin/AdminDashboard";
import "./App.css";

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin/login") return <AdminLogin />;
  if (path === "/admin/forgot-password") return <AdminForgotPassword />;
  if (path === "/admin/reset-password") return <AdminResetPassword />;
  if (path === "/admin") return <AdminDashboard />;

  return <Portfolio />;
}
