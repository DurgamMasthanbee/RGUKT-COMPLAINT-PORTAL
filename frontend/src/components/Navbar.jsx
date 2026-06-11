import { Link, useNavigate } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  loadUser();

  window.addEventListener("storage", loadUser);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("storage", loadUser);
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  const handleRaiseClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/auth");
    else navigate("/raise");
  };

  const handleAdminClick = () => {
    const token = localStorage.getItem("adminToken");
    navigate(token ? "/admin" : "/admin-login");
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 transition-all duration-300 backdrop-blur-3xl border-b border-white/10 shadow-2xl ${
        isScrolled ? "bg-slate-950/95" : "bg-slate-950/80"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20 transition"
          >
            <img
              src={logo}
              alt="logo"
              className="w-6 h-6 object-contain mix-blend-lighten"
            />
          </motion.div>

          <div className="leading-tight">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              RGUKT Ongole
            </h1>
            <p className="text-[10px] text-slate-400">Complaint Portal</p>
          </div>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-200">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleRaiseClick}
            className="hover:text-white transition"
          >
            Raise Complaint
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/track" className="hover:text-white transition">
              Track Complaint
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdminClick}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-blue-100 shadow-lg shadow-blue-500/10 hover:bg-white/15 transition"
          >
            <Shield size={16} /> Admin
          </motion.button>

          {/* Notification Bell */}
          {user && <NotificationBell />}

          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20"
              >
                {user.fullName?.charAt(0).toUpperCase() || "U"}
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl text-slate-200 overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="px-4 py-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                          {user.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{user.fullName || "User"}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email || "student@rgukt.ac.in"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => navigate("/profile"), 100);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"
                    >
                      👤 My Profile
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => navigate("/my-complaints"), 100);
                      }}
                      className="w-full text-left px-4 py-3 border-t border-white/10 hover:bg-white/10 transition flex items-center gap-2"
                    >
                      📋 My Complaints
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => navigate("/track"), 100);
                      }}
                      className="w-full text-left px-4 py-3 border-t border-white/10 hover:bg-white/10 transition flex items-center gap-2"
                    >
                      🔍 Track Complaints
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => navigate("/settings"), 100);
                      }}
                      className="w-full text-left px-4 py-3 border-t border-white/10 hover:bg-white/10 transition flex items-center gap-2"
                    >
                      ⚙️ Settings
                    </button>
                    
                    {/* Logout */}
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 border-t border-white/10 text-rose-300 hover:bg-rose-500/10 transition flex items-center gap-2"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-3 ml-4 pl-4 border-l border-white/10">
              <Link
                to="/auth"
                className="rounded-full border border-blue-500 px-4 py-2 text-blue-100 hover:bg-blue-500/10 transition"
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=signup"
                className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white shadow-lg shadow-blue-500/20 hover:brightness-110 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          {/* Notification Bell Mobile */}
          {user && <NotificationBell />}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenu(!menu)}
            className="p-2 rounded-full bg-white/10 text-slate-200 hover:bg-white/15 transition"
          >
            {menu ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full bg-slate-950/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl md:hidden z-50"
          >
            <div className="flex flex-col gap-3 px-6 py-6 text-slate-200">
              <Link to="/" onClick={() => setMenu(false)} className="rounded-3xl px-4 py-3 hover:bg-white/10 transition">
                Home
              </Link>
              <button
                onClick={() => {
                  setMenu(false);
                  handleRaiseClick();
                }}
                className="rounded-3xl px-4 py-3 text-left hover:bg-white/10 transition"
              >
                Raise Complaint
              </button>
              <Link to="/track" onClick={() => setMenu(false)} className="rounded-3xl px-4 py-3 hover:bg-white/10 transition">
                Track Complaint
              </Link>
              <Link to="/contact" onClick={() => setMenu(false)} className="rounded-3xl px-4 py-3 hover:bg-white/10 transition">
                Contact
              </Link>
              <button
                onClick={() => {
                  setMenu(false);
                  handleAdminClick();
                }}
                className="rounded-3xl bg-white/10 px-4 py-3 text-left hover:bg-white/15 transition"
              >
                Admin
              </button>

              {user && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenu(false)}
                    className="rounded-3xl px-4 py-3 hover:bg-white/10 transition"
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenu(false)}
                    className="rounded-3xl px-4 py-3 hover:bg-white/10 transition"
                  >
                    ⚙️ Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMenu(false);
                      handleLogout();
                    }}
                    className="rounded-3xl px-4 py-3 text-rose-300 hover:bg-rose-500/10 transition text-left"
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


