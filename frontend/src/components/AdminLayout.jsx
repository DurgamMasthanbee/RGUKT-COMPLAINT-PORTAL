import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 bg-slate-900/90 shadow-2xl p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Admin Panel
          </h2>

          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 rounded-3xl px-4 py-3 text-left transition-all duration-200 hover:bg-white/10">
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button className="flex items-center gap-2 rounded-3xl px-4 py-3 text-left transition-all duration-200 hover:bg-white/10">
              <FileText size={18} /> Complaints
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-3xl bg-red-500/10 px-4 py-3 text-red-200 transition-all duration-200 hover:bg-red-500/20"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}