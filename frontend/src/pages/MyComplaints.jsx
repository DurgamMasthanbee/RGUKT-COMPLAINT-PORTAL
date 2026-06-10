import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Edit, Search, AlertCircle } from "lucide-react";
import GlassLayout from "../components/GlassLayout";
import EmptyState from "../components/EmptyState";
import ComplaintCard from "../components/ComplaintCard";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://rgukt-complaint-portal.onrender.com//api/complaints?email=${user.email}`
      );
      setComplaints(res.data);
      setFilteredComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints based on search and status
  useEffect(() => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.complaintId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, complaints]);

  // DELETE
  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      await axios.delete(`http://https://rgukt-complaint-portal.onrender.com/api/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.error("Error deleting complaint:", err);
      alert("Delete failed ❌");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "from-emerald-500 to-green-500";
      case "In Progress":
        return "from-blue-500 to-cyan-500";
      case "Pending":
        return "from-yellow-500 to-orange-500";
      case "Assigned":
        return "from-purple-500 to-pink-500";
      case "Rejected":
        return "from-red-500 to-rose-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <GlassLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            📋 My Complaints
          </h1>
          <p className="text-slate-300">
            Track, manage, and update your submitted complaints
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-3 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 outline-none rounded-2xl bg-slate-950/80 text-white border border-white/15 placeholder-slate-500 focus:border-blue-400/50 transition"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 outline-none rounded-2xl bg-slate-950/80 text-white border border-white/15 focus:border-blue-400/50 transition"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">🟡 Pending</option>
              <option value="Assigned">🟣 Assigned</option>
              <option value="In Progress">🔵 In Progress</option>
              <option value="Resolved">🟢 Resolved</option>
              <option value="Rejected">🔴 Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-sm mb-6"
          >
            Found <span className="font-bold text-white">{filteredComplaints.length}</span> complaint
            {filteredComplaints.length !== 1 ? "s" : ""}
          </motion.p>
        )}

        {/* Complaints List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-slate-400">Loading your complaints...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <EmptyState
            icon="📭"
            title={
              complaints.length === 0 ? "No complaints yet" : "No results found"
            }
            description={
              complaints.length === 0
                ? "Start by raising a complaint to get assistance from our support team"
                : "Try adjusting your search filters"
            }
            action={() => navigate("/raise")}
            buttonText="Raise New Complaint"
          />
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6 hover:shadow-2xl hover:border-white/20 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    {/* Content */}
                    <div className="md:col-span-8">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {complaint.title}
                      </h3>

                      <p className="text-slate-300 mb-4 line-clamp-2">
                        {complaint.description}
                      </p>

                      <div className="flex flex-wrap gap-3 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">ID:</span>
                          <code className="bg-slate-950/50 px-2 py-1 rounded text-slate-200">
                            {complaint.complaintId}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                complaint.complaintId
                              );
                              alert("ID copied ✅");
                            }}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            📋
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Category:</span>
                          <span className="text-slate-200">
                            {complaint.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Priority:</span>
                          <span className="font-semibold text-amber-300">
                            {complaint.priority || "Normal"}
                          </span>
                        </div>
                      </div>

                      {complaint.location && (
                        <p className="text-xs text-slate-400">
                          📍 {complaint.location}
                        </p>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                      {/* Status Badge */}
                      <div
                        className={`rounded-2xl bg-gradient-to-r ${getStatusColor(
                          complaint.status
                        )} bg-opacity-10 border border-current/20 px-4 py-2 text-center font-semibold`}
                      >
                        {complaint.status === "Resolved" ? "🟢" : ""}
                        {complaint.status === "In Progress" ? "🔵" : ""}
                        {complaint.status === "Pending" ? "🟡" : ""}
                        {complaint.status === "Assigned" ? "🟣" : ""}
                        {complaint.status === "Rejected" ? "🔴" : ""}{" "}
                        {complaint.status}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/view", { state: complaint })
                          }
                          className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-blue-300 hover:bg-blue-500/20 transition font-semibold text-sm"
                        >
                          <Eye size={16} /> View
                        </button>

                        <button
                          onClick={() =>
                            navigate("/edit", { state: complaint })
                          }
                          className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-300 hover:bg-amber-500/20 transition font-semibold text-sm"
                        >
                          <Edit size={16} /> Edit
                        </button>

                        <button
                          onClick={() =>
                            navigate("/track", {
                              state: { id: complaint.complaintId },
                            })
                          }
                          className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300 hover:bg-emerald-500/20 transition font-semibold text-sm"
                        >
                          🔍 Track
                        </button>

                        <button
                          onClick={() => deleteComplaint(complaint._id)}
                          className="flex items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-300 hover:bg-rose-500/20 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Timestamp */}
                      <p className="text-xs text-slate-400 text-center">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </GlassLayout>
  );
}
