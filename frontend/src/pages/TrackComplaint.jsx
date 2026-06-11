import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, Calendar, User, Tag, Zap } from "lucide-react";
import GlassLayout from "../components/GlassLayout";
import Timeline from "../components/Timeline";
import Input from "../components/Input";
import Button from "../components/Button";

export default function TrackComplaint() {
  const location = useLocation();
  const [id, setId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-load if ID is passed via navigation state
  useEffect(() => {
    if (location.state?.id) {
      setId(location.state.id);
      handleTrack(location.state.id);
    }
  }, []);

  const handleTrack = async (complaintId = id) => {
    if (!complaintId.trim()) {
      setError("❌ Please enter a Complaint ID");
      return;
    }

    setLoading(true);
    setError("");
    setComplaint(null);

    try {
      const res = await axios.get(
        `https://rgukt-complaint-portal.onrender.com/api/complaints/${complaintId}`
      );
      setComplaint(res.data);
    } catch (err) {
      setError("❌ Complaint not found. Please check the ID.");
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "text-emerald-300";
      case "Pending":
        return "text-yellow-300";
      case "In Progress":
        return "text-blue-300";
      case "Assigned":
        return "text-purple-300";
      case "Rejected":
        return "text-red-300";
      default:
        return "text-slate-300";
    }
  };

  return (
    <GlassLayout>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              🔍 Track Your Complaint
            </h1>
            <p className="text-slate-300">
              Enter your Complaint ID to check status and view timeline
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="E.g. RGUKT-2024-001"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                className="flex-1 outline-none px-4 py-3 rounded-2xl bg-slate-950/80 text-white border border-white/15 placeholder-slate-500 focus:border-blue-400/50 focus:bg-slate-950/90 transition"
              />

              <Button
                onClick={() => handleTrack()}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/50"
              >
                {loading ? "Searching..." : "🔍 Track"}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-rose-300 mt-4 flex items-center gap-2"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Results Section */}
          {complaint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Complaint Header */}
              <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-900/10 backdrop-blur-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {complaint.title}
                </h2>
                <p className="text-slate-300 mb-6">{complaint.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Complaint ID
                    </p>
                    <p className="text-lg font-bold text-white font-mono">
                      {complaint.complaintId}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Category
                    </p>
                    <p className="text-lg font-bold text-blue-300">
                      {complaint.category}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Priority
                    </p>
                    <p className="text-lg font-bold text-amber-300">
                      {complaint.priority || "Normal"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Status
                    </p>
                    <p className={`text-lg font-bold ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8">
                  📊 Status Timeline
                </h3>
                <Timeline
                  status={complaint.status}
                  createdDate={complaint.createdAt}
                  updatedDate={complaint.updatedAt}
                />
              </div>

              {/* Details Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-6">
                    📋 Details
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        <MapPin size={16} className="inline mr-2" />
                        Location
                      </p>
                      <p className="text-slate-200">{complaint.location || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        <Calendar size={16} className="inline mr-2" />
                        Submitted
                      </p>
                      <p className="text-slate-200">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        <Tag size={16} className="inline mr-2" />
                        Department
                      </p>
                      <p className="text-slate-200">
                        {complaint.department || "General"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        <User size={16} className="inline mr-2" />
                        Assigned To
                      </p>
                      <p className="text-slate-200">
                        {complaint.assignedTo || "Not assigned yet"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-6">
                    ⏱️ Timeline
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Created
                      </p>
                      <p className="text-slate-200 text-sm">
                        {new Date(complaint.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Last Updated
                      </p>
                      <p className="text-slate-200 text-sm">
                        {new Date(complaint.updatedAt).toLocaleString()}
                      </p>
                    </div>

                    {complaint.status === "Resolved" && (
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">
                          Resolution Time
                        </p>
                        <p className="text-slate-200 text-sm">
                          {Math.ceil(
                            (new Date(complaint.updatedAt) -
                              new Date(complaint.createdAt)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Response
                      </p>
                      <p className="text-slate-200 text-sm">
                        {complaint.response || "Awaiting response..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!complaint && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-slate-400 text-lg">
                Enter your complaint ID above to get started
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </GlassLayout>
  );
}
