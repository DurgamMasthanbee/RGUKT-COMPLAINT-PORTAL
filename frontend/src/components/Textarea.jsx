import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Textarea({
  label,
  error,
  maxLength,
  rows = 5,
  className,
  ...props
}) {
  const charCount = props.value?.length || 0;

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          rows={rows}
          placeholder=" "
          className={cn(
            "peer w-full rounded-3xl border border-white/15 bg-white/10 text-white placeholder-transparent transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white/20 focus:shadow-[0_20px_80px_-40px_rgba(59,130,246,0.8)] p-5 min-h-[150px] text-base resize-none",
            error ? "border-red-400/80" : "",
            className
          )}
          maxLength={maxLength}
          {...props}
        />

        {label && (
          <label className="pointer-events-none absolute left-6 top-5 text-sm text-slate-300 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-200">
            {label}
          </label>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        {error && <p className="text-sm text-red-300">{error}</p>}
        {maxLength && (
          <p className="text-xs text-slate-400">
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
