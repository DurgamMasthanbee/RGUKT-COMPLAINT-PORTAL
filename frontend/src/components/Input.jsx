import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Input({
  label,
  error,
  icon: Icon,
  className,
  size = "md",
  ...props
}) {
  const sizes = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-4 text-base",
    lg: "px-6 py-5 text-lg",
  };

  return (
    <div className="w-full">
      <div className="relative">

        <input
          placeholder=" "
          className={cn(
            "peer w-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl text-white",
            "placeholder-transparent outline-none",
            "transition-all duration-300",
            "focus:border-blue-400",
            "focus:ring-2 focus:ring-blue-500/20",
            "focus:bg-white/15",
            "focus:shadow-[0_20px_80px_-40px_rgba(59,130,246,0.8)]",
            Icon ? "pl-14" : "pl-6",
            sizes[size],
            error && "border-red-400",
            className
          )}
          {...props}
        />

        {Icon && (
          <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
            <Icon size={18} />
          </div>
        )}

        {label && (
          <label
            className={cn(
              "absolute z-10 px-2 rounded-md",
              "bg-slate-900/80 backdrop-blur-sm",
              "text-slate-300",
              "transition-all duration-200",
              "pointer-events-none",

              Icon ? "left-12" : "left-4",

              // Default empty state
              "top-1/2 -translate-y-1/2 text-base",

              // Empty input state
              "peer-placeholder-shown:top-1/2",
              "peer-placeholder-shown:-translate-y-1/2",
              "peer-placeholder-shown:text-base",

              // Filled/focused state
              "peer-not-placeholder-shown:top-0",
              "peer-not-placeholder-shown:-translate-y-1/2",
              "peer-not-placeholder-shown:text-xs",
              "peer-focus:top-0",
              "peer-focus:-translate-y-1/2",
              "peer-focus:text-xs",
              "peer-focus:text-blue-300"
            )}
          >
            {label}
          </label>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}