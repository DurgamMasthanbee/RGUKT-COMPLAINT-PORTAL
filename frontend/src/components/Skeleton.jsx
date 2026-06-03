import { motion } from "framer-motion";

export default function Skeleton({ count = 1, height = "h-12", width = "w-full", circle = false, className }) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`${
            circle ? "rounded-full" : "rounded-lg"
          } bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${width} ${height} ${className}`}
        />
      ))}
    </div>
  );
}
