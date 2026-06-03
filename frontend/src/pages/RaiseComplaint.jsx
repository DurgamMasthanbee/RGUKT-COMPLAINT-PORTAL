import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

import GlassLayout from "../components/GlassLayout";
import FileUpload from "../components/FileUpload";

export default function RaiseComplaint() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.fullName || "",
    roll: user?.studentId || "",
    email: user?.email || "",
    department: "",
    category: "",
    priority: "Medium",
    location: "",
    title: "",
    description: "",
    anonymous: false,
  });

  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.category) {
      setForm((prev) => ({
        ...prev,
        category: location.state.category,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleAnonymous = () => {
    setForm((prev) => ({
      ...prev,
      anonymous: !prev.anonymous,
    }));
  };

  const handleFilesSelected = (files) => {
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // Add files
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      const res = await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const id = res?.data?.complaintId || "Generated";

      toast.success("Complaint Submitted Successfully ✅", {
        duration: 3000,
      });

      setTimeout(() => {
        toast(`Your Complaint ID: ${id}`, {
          icon: "📌",
        });
      }, 500);

      setForm((prev) => ({
        ...prev,
        department: "",
        category: "",
        priority: "Medium",
        location: "",
        title: "",
        description: "",
        anonymous: false,
      }));

      setAttachments([]);

      setTimeout(() => {
        navigate("/my-complaints");
      }, 2000);
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Submission Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassLayout>
      <div className="min-h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden text-slate-100">
        <div className="absolute w-80 h-80 bg-blue-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

        <Toaster position="top-center" />

        <div className="max-w-4xl mx-auto py-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-950/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="bg-blue-500/20 text-blue-200 p-3 rounded-full shadow-lg shadow-blue-500/10">
                  <FileText size={24} />
                </div>
              </div>

              <button className="bg-blue-500/20 text-blue-100 px-4 py-1 rounded-full text-sm mb-3 border border-blue-300/20">
                Complaint Registration
              </button>

              <h2 className="text-3xl font-bold text-white">
                Raise a Complaint
              </h2>

              <p className="text-slate-300 mt-2">
                Fill in the form below. Fields marked * are required.
              </p>
            </div>

            <div className="flex justify-between items-center bg-slate-900/70 p-4 rounded-3xl mb-6 border border-white/10">
              <div>
                <p className="font-semibold text-white">Submit Anonymously</p>
                <p className="text-sm text-slate-400">
                  Your identity will not be revealed
                </p>
              </div>

              <div
                onClick={toggleAnonymous}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  form.anonymous ? "bg-blue-600" : "bg-white/10"
                }`}
              >
                <motion.div
                  layout
                  className={`bg-slate-100 w-4 h-4 rounded-full transform ${
                    form.anonymous ? "translate-x-6" : ""
                  }`}
                ></motion.div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-slate-100 font-semibold">STUDENT INFORMATION</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" value={form.name} disabled className="input" />
                <input name="roll" value={form.roll} disabled className="input" />
                <input name="email" value={form.email} disabled className="input" />

                <select
                  name="department"
                  className="input"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>MECH</option>
                  <option>CIVIL</option>
                </select>
              </div>

              <h3 className="text-slate-100 font-semibold">COMPLAINT DETAILS</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="category"
                  className="input"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category *</option>
                  <option>Hostel</option>
                  <option>Mess</option>
                  <option>Academic</option>
                  <option>Infrastructure</option>
                  <option>IT Services</option>
                  <option>Discipline</option>
                  <option>Others</option>
                </select>

                <select
                  name="priority"
                  className="input"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>

                <input
                  name="location"
                  placeholder="Location"
                  className="input md:col-span-2"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <input
                name="title"
                placeholder="Title *"
                className="input"
                value={form.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description..."
                className="input h-32"
                value={form.description}
                onChange={handleChange}
                required
              />

              {/* File Upload Section */}
              <div>
                <h3 className="text-slate-100 font-semibold mb-4">
                  ATTACHMENTS (Optional)
                </h3>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  maxFiles={5}
                  maxSize={10}
                  acceptedFormats={["jpg", "jpeg", "png", "pdf"]}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition disabled:opacity-50"
              >
                {loading ? "⏳ Submitting..." : "🚀 Submit Complaint"}
              </button>
            </form>
          </motion.div>
        </div>

        <style>{`
          .input {
            width: 100%;
            padding: 14px;
            border-radius: 14px;
            border: 1px solid rgba(148,163,184,0.18);
            background: rgba(15,23,42,0.85);
            color: #e2e8f0;
          }

          .input::placeholder {
            color: rgba(226,232,240,0.6);
          }

          .input:disabled {
            opacity: 0.75;
          }
        `}</style>
      </div>
    </GlassLayout>
  );
}
