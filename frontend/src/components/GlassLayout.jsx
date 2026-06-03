import { motion } from "framer-motion";

export default function GlassLayout({ children, className }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">

      <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute right-0 top-28 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 px-4 py-8 md:px-10 ${className ?? ""}`}
      >
        {children}
      </motion.div>

    </div>
  );
}