import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Clock,
  CheckCircle,
  BookOpen,
  Building2,
  Utensils,
  Wrench,
  Monitor,
  ShieldAlert,
  MoreHorizontal,
  Sparkles,
  ShieldCheck,
  Layers,
  Rocket,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";

const workflowSteps = [
  {
    step: "Step 1",
    title: "Raise Complaint",
    description: "Student submits a complaint with category and details.",
    icon: <FileText size={24} />,
  },
  {
    step: "Step 2",
    title: "Complaint Review",
    description: "Complaint is reviewed by the concerned department.",
    icon: <ShieldCheck size={24} />,
  },
  {
    step: "Step 3",
    title: "In Progress",
    description: "Assigned staff begins resolving the issue.",
    icon: <Layers size={24} />,
  },
  {
    step: "Step 4",
    title: "Resolution",
    description: "Complaint is marked resolved and updated.",
    icon: <CheckCircle size={24} />,
  },
  {
    step: "Step 5",
    title: "Student Feedback",
    description: "Student can track status and provide feedback.",
    icon: <Rocket size={24} />,
  },
];

const benefitCards = [
  "Transparent Tracking",
  "Fast Resolution",
  "Secure Complaint System",
  "Real-Time Status Updates",
  "Student Friendly Interface",
  "Department Accountability",
];

export default function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [latest, setLatest] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);

  const getStatusBadgeClass = (status) => {
    const map = {
      Pending:
        "inline-flex items-center rounded-full border border-yellow-300/40 bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-100 shadow-[0_0_18px_rgba(245,158,11,0.18)]",
      Assigned:
        "inline-flex items-center rounded-full border border-blue-300/40 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-100 shadow-[0_0_18px_rgba(59,130,246,0.18)]",
      "In Progress":
        "inline-flex items-center rounded-full border border-purple-300/40 bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.18)]",
      Resolved:
        "inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.18)]",
      Rejected:
        "inline-flex items-center rounded-full border border-red-300/40 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-100 shadow-[0_0_18px_rgba(239,68,68,0.18)]",
    };
    return map[status] || map.Pending;
  };

  const formatTime = (value) => {
    if (!value) return "just now";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  };

  // ✅ Fetch Complaints
  useEffect(() => {
    const fetchLatestComplaints = async () => {
      try {
        const res = await fetch("https://rgukt-complaint-portal.onrender.com/api/complaints");
        const data = await res.json();

        const total = data.length;
        const resolved = data.filter((c) => c.status === "Resolved").length;
        const pending = data.filter((c) => c.status === "Pending").length;

        setLatest(data.slice(0, 3));
        setStats({
          total,
          resolved,
          pending,
          satisfaction: 98,
        });
        setLastFetched(new Date().toISOString());
      } catch (error) {
        setStats({});
        setLatest([]);
        setLastFetched(null);
      }
    };

    fetchLatestComplaints();
    const interval = setInterval(fetchLatestComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-white">

      {/* 🔥 Animated Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 md:px-10">

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm"
          >
            <Sparkles size={16} />
            Student Grievance Redressal System
          </motion.div>

          {/* Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              RGUKT Ongole <br />

              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Complaint Portal
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 max-w-2xl"
            >
              Your voice matters. Submit and track your campus
              complaints easily, transparently, and efficiently
              with our modern grievance system.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap pt-2"
            >
              <Button
                onClick={() => navigate("/raise")}
                variant="primary"
                size="lg"
                className="group"
              >
                <FileText size={20} />

                Raise a Complaint

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>

              <Button
                onClick={() => navigate("/track")}
                variant="glass"
                size="lg"
              >
                🔍 Track Complaint
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= LATEST COMPLAINT CARD ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute right-10 top-20 hidden lg:block w-[360px]"
        >
          <Card variant="glass" className="p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
                  Live complaints
                </p>
                <h3 className="text-xl font-semibold text-white">
                  Latest updates
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Showing {latest.length} of {stats.total || 0} complaints.
                </p>
              </div>
              <button
                onClick={() => navigate("/all-complaints")}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {latest.length === 0 ? (
                <p className="text-slate-300 text-sm">No complaints available.</p>
              ) : (
                latest.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-slate-900/20 backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white line-clamp-2">
                          {c.title || "Untitled complaint"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {c.description || "No description provided."}
                        </p>
                      </div>
                      <span className={getStatusBadgeClass(c.status)}>
                        {c.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span>{c.category || "General"}</span>
                      <span>{formatTime(c.updatedAt || c.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-500 flex items-center justify-between">
              <span>{latest.length} recent complaints</span>
              <span>{lastFetched ? `Updated ${formatTime(lastFetched)}` : "Fetching..."}</span>
            </div>
          </Card>
        </motion.div>

      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-10 mt-10">
        {[
          {
            title: "Resolved",
            value: stats.resolved || 0,
            icon: <CheckCircle className="mx-auto text-blue-400 mb-3" />,
          },
          {
            title: "Pending",
            value: stats.pending || 0,
            icon: <Clock className="mx-auto text-blue-400 mb-3" />,
          },
          {
            title: "Satisfaction",
            value: `${stats.satisfaction || 98}%`,
            icon: <CheckCircle className="mx-auto text-blue-400 mb-3" />,
          },
          {
            title: "Total",
            value: stats.total || 0,
            icon: <FileText className="mx-auto text-blue-400 mb-3" />,
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -6 }}
            className="bg-white/10 text-white rounded-3xl shadow-2xl p-7 text-center border border-white/20"
          >
            {card.icon}
            <h2 className="text-4xl font-bold">{card.value}</h2>
            <p className="text-slate-300 text-sm mt-2">{card.title}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-6 md:px-10 mt-20 pb-20">

        <h2 className="text-3xl font-bold text-center">
          Complaint Categories
        </h2>

        <p className="text-center text-gray-400 mt-2">
          We handle a wide range of campus-related issues.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

          {[
            { name: "Academic", icon: <BookOpen /> },
            { name: "Hostel", icon: <Building2 /> },
            { name: "Mess", icon: <Utensils /> },
            { name: "Infrastructure", icon: <Wrench /> },
            { name: "IT Services", icon: <Monitor /> },
            { name: "Discipline", icon: <ShieldAlert /> },
            { name: "Others", icon: <MoreHorizontal /> },
          ].map((c, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                y: -5,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate("/raise", {
                  state: { category: c.name },
                })
              }
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer text-center transition-all duration-300"
            >
              <div className="text-blue-400 flex justify-center mb-3">
                {c.icon}
              </div>

              <h3 className="font-semibold text-white">
                {c.name}
              </h3>
            </motion.div>
          ))}

        </div>

      </section>

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-3">How it works</p>
            <h2 className="text-4xl font-bold text-white">A seamless complaint journey</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-3">
              Five easy steps create clarity and accountability for every complaint.
            </p>
          </div>

          <div className="space-y-6">
            {workflowSteps.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-blue-500/15 text-blue-300 shadow-md">{item.icon}</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.step}</p>
                    <h3 className="text-xl font-semibold text-white mt-2">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-28">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-3">Why Choose RGUKT Complaint Portal?</p>
          <h2 className="text-4xl font-bold text-white">Built for students, trusted by departments</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefitCards.map((value) => (
            <motion.div
              key={value}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <p className="text-2xl mb-3">✓</p>
              <h3 className="text-xl font-semibold text-white">{value}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}