import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Card({
  children,
  variant = "glass",
  className,
  onClick,
  animated = true,
  ...props
}) {
  const variants = {
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300",
    elevated:
      "bg-slate-900/70 backdrop-blur-md border border-white/15 shadow-xl hover:shadow-2xl transition-all duration-300",
    flat: "bg-slate-950/90 border border-white/10 text-white",
    dark:
      "bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300",
  };

  const content = (
    <div className={cn(variants[variant], "rounded-xl p-6", className)} {...props}>
      {children}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      {content}
    </motion.div>
  );
}
