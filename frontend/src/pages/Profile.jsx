import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, AlertCircle, User, Award } from "lucide-react";
import GlassLayout from "../components/GlassLayout";
import Button from "../components/Button";
import Grid from "../components/Grid";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userRes = await axios.get(
          `http://localhost:5000/api/users/me?email=${localUser.email}`
        );
        setUser(userRes.data);

        // Fetch complaint statistics
        const token = localStorage.getItem("token");
        const complaintsRes = await axios.get("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const complaints = complaintsRes.data || [];
        setStats({
          total: complaints.length,
          pending: complaints.filter((c) => c.status === "Pending").length,
          inProgress: complaints.filter((c) => c.status === "In Progress").length,
          resolved: complaints.filter((c) => c.status === "Resolved").length,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <GlassLayout>
        <div className="text-center mt-10 text-slate-200">
          <p>Loading profile...</p>
        </div>
      </GlassLayout>
    );

  if (!user)
    return (
      <GlassLayout>
        <div className="text-center mt-10 text-slate-200">
          <p>Profile not found</p>
        </div>
      </GlassLayout>
    );

  return (
    <GlassLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-900/10 backdrop-blur-xl shadow-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/50"
            >
              <div className="text-6xl font-bold">
                {user.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {user.fullName || "User"}
              </h1>
              <p className="text-slate-300 mb-6">{user.email}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">Student ID</p>
                  <p className="text-lg font-bold text-white">
                    {user.studentId || "N/A"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">Branch</p>
                  <p className="text-lg font-bold text-white">
                    {user.department || "N/A"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">Year</p>
                  <p className="text-lg font-bold text-white">{user.year || "N/A"}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">Status</p>
                  <p className="text-lg font-bold text-emerald-300">Active</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/edit-profile", { state: user })}
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Grid
              icon={BarChart3}
              label="Total Complaints"
              value={stats.total}
              color="from-blue-500 to-cyan-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Grid
              icon={AlertCircle}
              label="Pending"
              value={stats.pending}
              color="from-yellow-500 to-orange-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Grid
              icon={User}
              label="In Progress"
              value={stats.inProgress}
              color="from-purple-500 to-pink-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Grid
              icon={Award}
              label="Resolved"
              value={stats.resolved}
              color="from-emerald-500 to-green-500"
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/raise")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/50"
            >
              ➕ Raise New Complaint
            </Button>
            <Button
              onClick={() => navigate("/my-complaints")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
            >
              📋 My Complaints
            </Button>
            <Button
              onClick={() => navigate("/track")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              🔍 Track Complaint
            </Button>
          </div>
        </motion.div>
      </div>
    </GlassLayout>
  );
}
