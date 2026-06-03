import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      {Icon && (
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4 p-4 rounded-3xl bg-white/10 text-blue-300"
        >
          <Icon size={48} />
        </motion.div>
      )}

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-center mb-4 max-w-md">{description}</p>

      {action && <div>{action}</div>}
    </motion.div>
  );
}
