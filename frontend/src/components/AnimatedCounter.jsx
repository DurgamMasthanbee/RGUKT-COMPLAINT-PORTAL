import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCounter({ from = 0, to = 100, duration = 2, icon: Icon, label, color = "from-blue-500 to-cyan-500" }) {
  const [value, setValue] = useState(from);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const start = from;
    const end = to;
    const range = end - start;
    const increment = range / (duration * 60); // 60fps
    let current = start;

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setValue(current);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isVisible, from, to, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl shadow-2xl hover:shadow-3xl p-8 text-center transition-all duration-300"
    >
      {Icon && (
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr ${color} mb-4 shadow-lg`}>
          <Icon size={32} className="text-white" />
        </div>
      )}

      <motion.div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
        {Math.floor(value)}
        {to >= 100 && to < 1000 && <span className="text-3xl">+</span>}
        {to >= 1000 && <span className="text-3xl">k</span>}
      </motion.div>

      <p className="text-slate-300 text-sm font-medium">{label}</p>
    </motion.div>
  );
}
