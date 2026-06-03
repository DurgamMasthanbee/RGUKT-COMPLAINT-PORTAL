import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function StatusBadge({ status, className }) {
  const statusMap = {
    Pending: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-300",
      border: "border-yellow-500/30",
      glow: "shadow-[0_0_24px_rgba(245,158,11,0.18)]",
      dot: "bg-yellow-300",
    },
    Assigned: {
      bg: "bg-blue-500/20",
      text: "text-blue-300",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_24px_rgba(59,130,246,0.18)]",
      dot: "bg-blue-300",
    },
    "In Progress": {
      bg: "bg-purple-500/20",
      text: "text-purple-300",
      border: "border-purple-500/30",
      glow: "shadow-[0_0_24px_rgba(168,85,247,0.18)]",
      dot: "bg-purple-300",
    },
    Resolved: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      border: "border-green-500/30",
      glow: "shadow-[0_0_24px_rgba(16,185,129,0.18)]",
      dot: "bg-green-300",
    },
    Rejected: {
      bg: "bg-red-500/20",
      text: "text-red-300",
      border: "border-red-500/30",
      glow: "shadow-[0_0_24px_rgba(239,68,68,0.18)]",
      dot: "bg-red-300",
    },
    Submitted: {
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      border: "border-amber-500/30",
      glow: "shadow-[0_0_24px_rgba(245,158,11,0.18)]",
      dot: "bg-amber-300",
    },
    "Under Review": {
      bg: "bg-sky-500/20",
      text: "text-sky-300",
      border: "border-sky-500/30",
      glow: "shadow-[0_0_24px_rgba(56,189,248,0.18)]",
      dot: "bg-sky-300",
    },
  };

  const style = statusMap[status] || {
    bg: "bg-slate-500/20",
    text: "text-slate-100",
    border: "border-slate-300/30",
    glow: "shadow-[0_0_24px_rgba(148,163,184,0.18)]",
    dot: "bg-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all duration-300",
        style.bg,
        style.text,
        style.border,
        style.glow,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", style.dot)} />
      {status}
    </span>
  );
}
