import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        return;
      }

      // ✅ FIXED STORAGE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");

      alert("Admin Login Success ✅");

      navigate("/admin");

    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950">
      <div className="bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl shadow-slate-900/40 rounded-3xl w-80 p-8 text-slate-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Admin Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-400 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}