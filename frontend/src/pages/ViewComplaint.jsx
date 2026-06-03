import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, User, FileText, Tag } from "lucide-react";
import GlassLayout from "../components/GlassLayout";
import Timeline from "../components/Timeline";
import Button from "../components/Button";

export default function ViewComplaint() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <GlassLayout>
        <div className="max-w-2xl mx-auto mt-10 text-center">
          <p className="text-slate-300">No complaint data available</p>
          <Button
            onClick={() => navigate("/my-complaints")}
            className="mt-4 bg-blue-500 hover:bg-blue-600"
          >
            Back to Complaints
          </Button>
        </div>
      </GlassLayout>
    );

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
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition mb-6"
        >
          <ArrowLeft size={20} /> Back
        </motion.button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-900/10 backdrop-blur-xl shadow-2xl p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {state.title}
                </h1>
                <p className="text-slate-300 mb-4">{state.description}</p>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-r ${getStatusColor(
                  state.status
                )} bg-opacity-10 border border-current/20 px-6 py-3 text-center font-bold whitespace-nowrap`}
              >
                {state.status === "Resolved" ? "✅" : ""}
                {state.status === "In Progress" ? "⚙️" : ""}
                {state.status === "Pending" ? "⏳" : ""}
                {state.status === "Assigned" ? "👤" : ""}
                {state.status === "Rejected" ? "❌" : ""} {state.status}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Complaint ID
                </p>
                <p className="text-lg font-bold text-white font-mono">
                  {state.complaintId}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Category
                </p>
                <p className="text-lg font-bold text-blue-300">
                  {state.category}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Priority
                </p>
                <p className="text-lg font-bold text-amber-300">
                  {state.priority || "Normal"}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Department
                </p>
                <p className="text-lg font-bold text-white">
                  {state.department || "General"}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              📊 Complaint Timeline
            </h2>
            <Timeline
              status={state.status}
              createdDate={state.createdAt}
              updatedDate={state.updatedAt}
            />
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Complaint Details */}
            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                📋 Complaint Details
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-2">
                    <FileText size={14} /> Title
                  </p>
                  <p className="text-slate-200">{state.title}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </p>
                  <p className="text-slate-200">{state.location || "Not specified"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-2">
                    <Tag size={14} /> Category
                  </p>
                  <p className="text-slate-200">{state.category}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Description
                  </p>
                  <p className="text-slate-200 text-sm line-clamp-4">
                    {state.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Submitter & Dates */}
            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                👤 Submitter Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-2">
                    <User size={14} /> Name
                  </p>
                  <p className="text-slate-200">{state.name}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Email
                  </p>
                  <p className="text-slate-200 break-all text-sm">{state.email}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Phone
                  </p>
                  <p className="text-slate-200">{state.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-2">
                    <Calendar size={14} /> Submitted
                  </p>
                  <p className="text-slate-200">
                    {state.createdAt
                      ? new Date(state.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Last Updated
                  </p>
                  <p className="text-slate-200">
                    {state.updatedAt
                      ? new Date(state.updatedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Response Section */}
          {state.adminResponse && (
            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                💬 Admin Response
              </h3>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-slate-200">{state.adminResponse}</p>
                {state.respondedAt && (
                  <p className="text-xs text-slate-400 mt-3">
                    Responded on {new Date(state.respondedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <Button
              onClick={() => navigate(-1)}
              className="flex-1 bg-white/10 hover:bg-white/15 text-white"
            >
              ← Back
            </Button>

            {state.status !== "Resolved" && state.status !== "Rejected" && (
              <Button
                onClick={() => navigate("/edit", { state })}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/50"
              >
                ✏️ Edit Complaint
              </Button>
            )}

            <Button
              onClick={() =>
                navigate("/track", {
                  state: { id: state.complaintId },
                })
              }
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              🔍 Track Status
            </Button>
          </div>
        </motion.div>
      </div>
    </GlassLayout>
  );
}