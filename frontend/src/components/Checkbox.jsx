import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Checkbox({ 
  label, 
  checked = false, 
  onChange, 
  disabled = false,
  className
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <motion.div
        whileTap={!disabled ? { scale: 0.9 } : {}}
        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? "bg-blue-500 border-blue-600"
            : "border-white/15 bg-slate-950 hover:border-white/30"
        }`}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Check size={16} className="text-white" />
          </motion.div>
        )}
      </motion.div>

      {label && (
        <span className="text-slate-200 font-medium select-none">
          {label}
        </span>
      )}

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
    </label>
  );
}
