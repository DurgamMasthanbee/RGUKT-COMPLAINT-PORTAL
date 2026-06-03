import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Table({ columns, data, rowKey, isLoading, actions, className }) {
  if (isLoading) {
    return (
      <div className="p-6 text-center text-slate-300">
        <div className="inline-block w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-slate-300">
        No data found
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-xl", className)}>
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/10 text-slate-300">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.08em]">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, rowIndex) => (
            <motion.tr
              key={row[rowKey] || rowIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.04 }}
              className="hover:bg-white/10 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-slate-200 align-top">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap gap-2">
                    {actions(row).map((action, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => action.onClick(row)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap",
                          action.className || "bg-white/10 text-white hover:bg-white/20"
                        )}
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
