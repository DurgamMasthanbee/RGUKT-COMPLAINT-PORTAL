import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const variants = {
    primary: "bg-blue-500/20 text-blue-200 border border-blue-400/30",
    success: "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",
    warning: "bg-amber-500/20 text-amber-200 border border-amber-400/30",
    danger: "bg-red-500/20 text-red-200 border border-red-400/30",
    pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
    inprogress: "bg-sky-500/20 text-sky-300 border border-sky-400/30",
    resolved: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30",
    rejected: "bg-red-500/20 text-red-300 border border-red-400/30",
    assigned: "bg-purple-500/20 text-purple-300 border border-purple-400/30",
    glass: "bg-white/20 text-white border border-white/30 backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1.5 text-sm font-medium",
    lg: "px-4 py-2 text-base font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
