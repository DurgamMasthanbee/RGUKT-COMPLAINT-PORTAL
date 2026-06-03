// Complaint Status Options
export const STATUSES = [
  { value: "Pending", label: "Pending", color: "orange", bg: "bg-yellow-500/20", text: "text-yellow-300" },
  { value: "Assigned", label: "Assigned", color: "purple", bg: "bg-blue-500/20", text: "text-blue-300" },
  { value: "In Progress", label: "In Progress", color: "blue", bg: "bg-purple-500/20", text: "text-purple-300" },
  { value: "Resolved", label: "Resolved", color: "green", bg: "bg-green-500/20", text: "text-green-300" },
  { value: "Rejected", label: "Rejected", color: "red", bg: "bg-red-500/20", text: "text-red-300" },
];

// Complaint Categories
export const CATEGORIES = [
  "Academic",
  "Hostel",
  "Mess",
  "Infrastructure",
  "IT Services",
  "Discipline",
  "Sports",
  "Others",
];

// Priority Levels
export const PRIORITIES = [
  { value: "Low", label: "Low", color: "green" },
  { value: "Medium", label: "Medium", color: "yellow" },
  { value: "High", label: "High", color: "red" },
];

// Departments
export const DEPARTMENTS = [
  "CSE",
  "ECE",
  "MECH",
  "CIVIL",
  "CHEMICAL",
  "PUC",
  "Other",
];

// Get status colors
export const getStatusStyle = (status) => {
  const found = STATUSES.find((s) => s.value === status);
  return found || { color: "gray", bg: "bg-slate-500/20", text: "text-slate-300" };
};

// Get priority colors
export const getPriorityColor = (priority) => {
  const map = {
    "Low": "text-emerald-300",
    "Medium": "text-yellow-300",
    "High": "text-red-300",
  };
  return map[priority] || "text-slate-300";
};

// Status badge variant mapping
export const getStatusVariant = (status) => {
  const map = {
    "Pending": "pending",
    "Assigned": "assigned",
    "In Progress": "inprogress",
    "Resolved": "success",
    "Rejected": "danger",
    "Submitted": "pending",
    "Under Review": "inprogress",
  };
  return map[status] || "primary";
};
