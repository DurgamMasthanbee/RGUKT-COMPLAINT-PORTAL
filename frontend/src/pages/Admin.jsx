
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  FileText,
  AlertTriangle,
  Search,
  Filter,
  Sparkles,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import GlassLayout from "../components/GlassLayout";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";

const statusOptions = [
  "All Status",
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
  "Rejected",
];

const categoryOptions = [
  "All Categories",
  "Academic",
  "Hostel",
  "Mess",
  "Infrastructure",
  "IT Services",
  "Discipline",
  "Other",
];

const priorityOptions = ["All", "Low", "Medium", "High"];
const departmentOptions = ["All", "CSE", "ECE", "MECH", "CIVIL", "CHEMICAL", "PUC", "Other"];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterData();
  }, [complaints, search, statusFilter, categoryFilter, priorityFilter, deptFilter]);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("https://rgukt-complaint-portal.onrender.com/api/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setComplaints(res.data || []);
    setStats({
      total: res.data.length,
      pending: res.data.filter((c) => c.status === "Pending").length,
      progress: res.data.filter((c) => c.status === "In Progress").length,
      resolved: res.data.filter((c) => c.status === "Resolved").length,
      high: res.data.filter((c) => c.priority === "High").length,
    });
  };

  const filterData = () => {
    let data = complaints;

    data = data.filter(
      (c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.complaintId?.toLowerCase().includes(search.toLowerCase()) ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.roll?.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All Status") data = data.filter((c) => c.status === statusFilter);
    if (categoryFilter !== "All Categories") data = data.filter((c) => c.category === categoryFilter);
    if (priorityFilter !== "All") data = data.filter((c) => c.priority === priorityFilter);
    if (deptFilter !== "All") data = data.filter((c) => c.department === deptFilter);

    setFiltered(data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://rgukt-complaint-portal.onrender.com//api/complaints/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchComplaints();
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setComment(complaint.comment || "");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://rgukt-complaint-portal.onrender.com//api/complaints/${selectedComplaint._id}`,
      { status: newStatus, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setShowModal(false);
    fetchComplaints();
  };

  const statusChartData = useMemo(
    () => [
      { name: "Pending", value: stats.pending || 0 },
      { name: "In Progress", value: stats.progress || 0 },
      { name: "Resolved", value: stats.resolved || 0 },
      { name: "Other", value: Math.max((stats.total || 0) - ((stats.pending || 0) + (stats.progress || 0) + (stats.resolved || 0)), 0) },
    ],
    [stats]
  );

  const monthlyData = useMemo(() => {
    const counts = monthNames.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});
    complaints.forEach((item) => {
      const created = new Date(item.createdAt);
      if (!Number.isNaN(created.getTime())) {
        const month = monthNames[created.getMonth()];
        counts[month] += 1;
      }
    });
    return monthNames.map((name) => ({ name, count: counts[name] }));
  }, [complaints]);

  const departmentData = useMemo(() => {
    const map = {};
    complaints.forEach((item) => {
      const department = item.department || "Other";
      map[department] = (map[department] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [complaints]);

  const resolutionRate = useMemo(() => {
    if (!stats.total) return 0;
    return Math.round((stats.resolved / stats.total) * 100);
  }, [stats]);

  const resolutionData = useMemo(
    () => [
      { name: "Resolved", value: resolutionRate },
      { name: "Remaining", value: Math.max(100 - resolutionRate, 0) },
    ],
    [resolutionRate]
  );

  const activityFeed = useMemo(
    () =>
      [...complaints]
        .sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        )
        .slice(0, 6)
        .map((item) => ({
          id: item._id,
          title: `Complaint #${item.complaintId || item._id?.slice(-6)} ${
            item.status === "Resolved" ? "resolved" : "updated"
          }`,
          description: `${item.category || "General"} • ${item.department || "Campus"}`,
          time: new Date(item.updatedAt || item.createdAt).toLocaleDateString(),
          status: item.status,
        })),
    [complaints]
  );

  return (
    <>
      <GlassLayout>
        <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr] mb-8"
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden p-8">
              <div className="absolute -right-12 top-10 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute left-8 top-24 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">
                Welcome Back, Admin
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Monitor complaints, track progress, and improve student satisfaction.
              </h1>
              <p className="text-gray-200 max-w-2xl mt-5 text-lg">
                Use the upgraded dashboard to stay ahead with live complaint insights, fast actions, and clear team collaboration.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Open cases</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stats.pending || 0}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Resolved rate</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{resolutionRate}%</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">High priority</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stats.high || 0}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "Total Complaints",
                  value: stats.total || 0,
                  icon: <FileText className="text-blue-400" />,
                },
                {
                  title: "Pending",
                  value: stats.pending || 0,
                  icon: <Clock3 className="text-yellow-300" />,
                },
                {
                  title: "In Progress",
                  value: stats.progress || 0,
                  icon: <Sparkles className="text-purple-300" />,
                },
                {
                  title: "Resolved",
                  value: stats.resolved || 0,
                  icon: <CheckCircle2 className="text-emerald-300" />,
                },
                {
                  title: "High Priority",
                  value: stats.high || 0,
                  icon: <AlertTriangle className="text-red-300" />,
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                        {card.title}
                      </p>
                      <h2 className="mt-3 text-4xl font-semibold text-white">
                        {card.value}
                      </h2>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white">
                      {card.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6 mb-8"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-2">
                  Search & filter
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Find the complaint fast
                </h2>
              </div>
              <div className="rounded-3xl bg-slate-950/70 px-4 py-3 text-sm text-slate-300 border border-white/10">
                {filtered.length} matching records
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              <Input
                icon={Search}
                label="Search complaints"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-3xl"
              />
              <Select
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className="rounded-3xl"
              />
              <Select
                label="Category"
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                className="rounded-3xl"
              />
              <Select
                label="Priority"
                options={priorityOptions}
                value={priorityFilter}
                onChange={setPriorityFilter}
                className="rounded-3xl"
              />
              <Select
                label="Department"
                options={departmentOptions}
                value={deptFilter}
                onChange={setDeptFilter}
                className="rounded-3xl"
              />
            </div>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/10 text-white font-semibold">
                Complaints ({filtered.length})
              </div>
              <div className="grid grid-cols-7 gap-4 px-6 py-4 text-xs uppercase tracking-[0.22em] text-gray-200 border-b border-white/10">
                <div>ID</div>
                <div>Student</div>
                <div>Category</div>
                <div>Priority</div>
                <div>Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              <div className="space-y-2 px-6 py-4">
                {filtered.map((c) => (
                  <div
                    key={c._id}
                    className="grid grid-cols-7 gap-4 rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-4 items-center transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="text-blue-300 text-sm font-semibold">{c.complaintId}</div>
                    <div>
                      <p className="text-white font-medium">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.roll}</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">{c.category}</p>
                      <p className="text-xs text-slate-400">{c.title}</p>
                    </div>
                    <div>
                      <span className={
                        `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          c.priority === "High"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : c.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`
                      }>
                        {c.priority}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>
                    <div><StatusBadge status={c.status} /></div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-sm px-3 py-2"
                        onClick={() => handleView(c)}
                      >
                        View
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        className="text-sm px-3 py-2"
                        onClick={() => updateStatus(c._id, "Resolved")}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Complaint Analytics</p>
                    <h2 className="text-2xl font-semibold text-white">Live insights</h2>
                  </div>
                  <div className="text-slate-300 text-sm">Updated now</div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={84}
                        paddingAngle={4}
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={
                              index === 0
                                ? "#f59e0b"
                                : index === 1
                                ? "#8b5cf6"
                                : index === 2
                                ? "#22c55e"
                                : "#64748b"
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                      />
                      <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">Recent activity</p>
                <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
                  {activityFeed.length === 0 ? (
                    <p className="text-slate-300">No recent actions yet.</p>
                  ) : (
                    activityFeed.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-3xl border border-white/10 bg-slate-950/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-white font-semibold">{item.title}</p>
                            <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.time}</span>
                        </div>
                        <div className="mt-3">
                          <StatusBadge status={item.status} className="text-sm" />
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Monthly complaints</p>
                  <h2 className="text-2xl font-semibold text-white">Trend this year</h2>
                </div>
                <span className="text-slate-300 text-sm">Total {stats.total || 0}</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" radius={[12, 12, 0, 0]} fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Department breakdown</p>
                  <h2 className="text-2xl font-semibold text-white">Teams & issues</h2>
                </div>
                <span className="text-slate-300 text-sm">Top departments</span>
              </div>
              <div className="h-72 overflow-y-auto pr-1">
                {departmentData.map((item) => (
                  <div key={item.name} className="mb-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-slate-400 text-sm">{item.value} complaints</p>
                      </div>
                      <span className="text-blue-300 font-semibold">{item.value}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: `${Math.min(100, (item.value / Math.max(1, stats.total)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassLayout>

      {showModal && selectedComplaint && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 sm:px-6">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl rounded-[2rem] border border-white/15 bg-slate-950/95 backdrop-blur-xl p-6 shadow-2xl z-20"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 text-slate-300 hover:text-white"
            >
              ✕
            </button>

            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Complaint details</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{selectedComplaint.title}</h2>
              <p className="mt-2 text-slate-300">{selectedComplaint.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Student</p>
                <p className="mt-2 text-white font-semibold">{selectedComplaint.name}</p>
                <p className="text-slate-400 text-sm mt-1">{selectedComplaint.roll}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Created</p>
                <p className="mt-2 text-white font-semibold">{new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
                <p className="text-slate-400 text-sm mt-1">{selectedComplaint.priority} priority</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Update Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              >
                {statusOptions.filter((option) => option !== "All Status").map((option) => (
                  <option key={option} value={option} className="bg-slate-950 text-white">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[140px] w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleUpdate} className="px-6 py-3">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)} className="px-6 py-3">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

