import { motion } from "framer-motion";
import { Edit2, Trash2, Eye } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";

export default function ComplaintCard({ 
  item, 
  onView, 
  onEdit, 
  onDelete, 
  onStatusChange,
  interactive = true 
}) {
  const getStatusBadgeVariant = (status) => {
    const variants = {
      "Pending": "pending",
      "Assigned": "assigned",
      "In Progress": "inprogress",
      "Resolved": "success",
      "Rejected": "danger",
      "Submitted": "pending",
      "Under Review": "inprogress",
    };
    return variants[status] || "primary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -4 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <Card variant="glass" className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-white line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ID: {item.complaintId || item._id?.slice(-8)}
            </p>
          </div>
          <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
            {item.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-3 line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
            <p className="text-slate-400 font-medium">Category</p>
            <p className="text-white font-semibold">{item.category}</p>
          </div>
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
            <p className="text-slate-400 font-medium">Priority</p>
            <p className={`font-semibold ${
              item.priority === "High" ? "text-red-300" :
              item.priority === "Medium" ? "text-yellow-300" : "text-emerald-300"
            }`}>
              {item.priority || "Medium"}
            </p>
          </div>
        </div>

        {/* Student Info */}
        <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-slate-300">
            <span className="font-medium text-white">Student:</span> {item.name} {item.anonymous && "(Anonymous)"}
          </p>
          {!item.anonymous && (
            <>
                  <p className="text-xs text-slate-300 mt-1">
                <span className="font-medium text-white">Email:</span> {item.email}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                <span className="font-medium text-white">Roll:</span> {item.roll}
              </p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {interactive && (
          <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/10">
            {onView && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onView(item)}
                className="flex-1 min-w-[120px] rounded-3xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-white/20"
              >
                <Eye size={14} className="inline-block mr-1" />
                View
              </motion.button>
            )}

            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(item)}
                className="flex-1 min-w-[120px] rounded-3xl bg-slate-900/80 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-slate-900"
              >
                <Edit2 size={14} className="inline-block mr-1" />
                Edit
              </motion.button>
            )}

            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(item)}
                className="flex-1 min-w-[120px] rounded-3xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200 transition-all duration-200 hover:bg-red-500/20"
              >
                <Trash2 size={14} className="inline-block mr-1" />
                Delete
              </motion.button>
            )}
          </div>
        )}

        {/* Status Change Buttons */}
        {onStatusChange && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStatusChange(item._id, "In Progress")}
              className="flex-1 px-2 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              ⏳ Progress
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStatusChange(item._id, "Resolved")}
              className="flex-1 px-2 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              ✓ Resolve
            </motion.button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}