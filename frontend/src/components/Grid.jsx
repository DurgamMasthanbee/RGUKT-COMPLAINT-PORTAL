import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Grid({ 
  title, 
  icon: Icon, 
  value, 
  change, 
  changeType = "positive", 
  className,
  trend
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white/10 rounded-3xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-300 text-sm font-medium">{title}</p>
          <motion.h3
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-white mt-2"
          >
            {value}
          </motion.h3>
        </div>
        {Icon && (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 rounded-3xl bg-blue-500/10 text-blue-300"
          >
            <Icon size={24} />
          </motion.div>
        )}
      </div>

      {change && (
        <div className={cn(
          "text-sm font-semibold flex items-center gap-1",
          changeType === "positive" ? "text-emerald-300" : "text-red-300"
        )}>
          <span>{changeType === "positive" ? "↑" : "↓"} {Math.abs(change)}%</span>
          <span className="text-slate-400 font-normal">from last month</span>
        </div>
      )}

      {trend && (
        <div className="mt-4 h-10 flex items-end gap-1">
          {trend.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${(value / 100) * 100}%` }}
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
              className="flex-1 rounded-t-full bg-gradient-to-t from-blue-400 to-blue-300 opacity-80 hover:opacity-100 transition-opacity"
              style={{ minHeight: "4px" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
