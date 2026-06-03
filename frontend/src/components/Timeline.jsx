import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function Timeline({ status, createdDate, updatedDate }) {
  const stages = [
    { name: "Submitted", icon: "📝" },
    { name: "Assigned", icon: "👤" },
    { name: "In Progress", icon: "⚙️" },
    { name: "Resolved", icon: "✓" },
  ];

  const statusToIndex = {
    "Submitted": 0,
    "Assigned": 1,
    "In Progress": 2,
    "Resolved": 3,
    "Pending": 0,
    "Under Review": 1,
    "Rejected": 2,
  };

  const currentIndex = statusToIndex[status] || 0;

  return (
    <div className="w-full">
      {/* Desktop Timeline */}
      <div className="hidden sm:flex items-center justify-between gap-2 mb-8">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center flex-1"
          >
            {/* Circle */}
            <motion.div
              animate={{
                scale: index <= currentIndex ? 1.1 : 1,
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3 border-2 transition-all duration-300 ${
                index <= currentIndex
                  ? "bg-gradient-to-tr from-blue-500 to-indigo-600 border-blue-400 shadow-lg shadow-blue-500/50"
                  : "bg-slate-950/50 border-white/10"
              }`}
            >
              {stage.icon}
            </motion.div>

            {/* Label */}
            <p
              className={`text-xs font-semibold text-center ${
                index <= currentIndex ? "text-blue-300" : "text-slate-400"
              }`}
            >
              {stage.name}
            </p>

            {/* Connector */}
            {index < stages.length - 1 && (
              <div
                className={`absolute w-14 h-0.5 mt-[-3.5rem] ml-10 ${
                  index < currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "bg-white/10"
                }`}
                style={{ marginLeft: "70px", marginTop: "-1.5rem" }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="sm:hidden space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            {/* Dot */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: index <= currentIndex ? 1.1 : 1,
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                  index <= currentIndex
                    ? "bg-gradient-to-tr from-blue-500 to-indigo-600 border-blue-400 text-lg"
                    : "bg-slate-950/50 border-white/10 text-sm"
                }`}
              >
                {stage.icon}
              </motion.div>

              {/* Connector */}
              {index < stages.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    index < currentIndex
                      ? "bg-gradient-to-b from-blue-500 to-indigo-600"
                      : "bg-white/10"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="pt-1">
              <p
                className={`font-semibold ${
                  index <= currentIndex ? "text-blue-300" : "text-slate-400"
                }`}
              >
                {stage.name}
              </p>
              {index === currentIndex && (
                <p className="text-xs text-slate-400 mt-1">
                  Current Status • Updated recently
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium mb-1">Current Status</p>
            <p className="text-lg font-bold text-white flex items-center gap-2">
              {status === "Resolved" ? (
                <>
                  <CheckCircle2 size={20} className="text-emerald-400" /> {status}
                </>
              ) : status === "In Progress" ? (
                <>
                  <Clock size={20} className="text-blue-400" /> {status}
                </>
              ) : (
                <>
                  <AlertCircle size={20} className="text-yellow-400" /> {status}
                </>
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium mb-1">Last Updated</p>
            <p className="text-lg font-bold text-white">
              {updatedDate ? new Date(updatedDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
