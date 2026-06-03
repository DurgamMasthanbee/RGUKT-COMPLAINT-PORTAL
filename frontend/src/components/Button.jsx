import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  isLoading = false,
  ...props
}) {
  const baseClasses =
    "font-semibold rounded-3xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-95",
    secondary:
      "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:shadow-lg active:scale-95",
    ghost:
      "bg-transparent text-slate-200 hover:bg-white/10 active:scale-95",
    danger:
      "bg-red-500/10 border border-red-500/20 text-red-200 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95",
    success:
      "bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 hover:bg-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95",
    glass:
      "bg-white/15 backdrop-blur-lg border border-white/20 text-white hover:bg-white/25 hover:shadow-2xl active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
