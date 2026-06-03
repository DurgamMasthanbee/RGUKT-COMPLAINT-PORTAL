import { motion } from "framer-motion";

export default function Loading({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8">
      <Spinner />
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full"
    />
  );
}
