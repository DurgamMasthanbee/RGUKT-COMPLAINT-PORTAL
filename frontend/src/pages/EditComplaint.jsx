import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Save } from "lucide-react";
import GlassLayout from "../components/GlassLayout";

export default function EditComplaint() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://rgukt-complaint-portal.onrender.com/api/complaints/${form._id}`,
        form
      );

      alert("Complaint Updated Successfully ✅");
      navigate("/my-complaints");
    } catch (err) {
      alert("Update Failed ❌");
    }
  };

  return (
    <GlassLayout>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-blue-500/20">
              <FileText className="text-blue-300" size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                Edit Complaint
              </h2>

              <p className="text-slate-400">
                Update your complaint details
              </p>
            </div>
          </div>

          {/* Complaint ID */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">
              Complaint ID
            </label>

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-3 text-blue-300 font-semibold">
              {form.complaintId}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">
              Complaint Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-950/80 border border-white/15 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={8}
              className="w-full rounded-2xl bg-slate-950/80 border border-white/15 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-400 outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-950/80 border border-white/15 px-4 py-3 text-white focus:border-blue-400 outline-none"
            >
              <option>Hostel</option>
              <option>Mess</option>
              <option>Academic</option>
              <option>Infrastructure</option>
              <option>IT Services</option>
              <option>Others</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/my-complaints")}
              className="flex-1 rounded-2xl border border-white/15 bg-white/5 py-3 text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              <Save size={18} />
              Update Complaint
            </button>
          </div>
        </motion.div>
      </div>
    </GlassLayout>
  );
}