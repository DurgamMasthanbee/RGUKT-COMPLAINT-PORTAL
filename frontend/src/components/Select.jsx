import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions = options?.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option
  ) || [];

  const selected = normalizedOptions.find((opt) => opt.value === value);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <motion.button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 px-5 py-3 text-left text-slate-100 transition-all duration-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-white/20",
            error ? "border-red-400/80" : "",
            className
          )}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
          <span className={cn(value ? "text-slate-100" : "text-slate-400")}>{selected?.label || placeholder}</span>
          <ChevronDown size={18} className={cn("transition-transform", isOpen && "rotate-180")}/>
        </motion.button>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl z-20"
            >
              {normalizedOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  className="w-full px-4 py-3 text-left text-slate-100 hover:text-white transition-colors"
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </div>
  );
}
