import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import GlassLayout from "../components/GlassLayout";

export default function EditComplaint() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/api/complaints/${form._id}`,
      form
    );

    alert("Updated ✅");
    navigate("/my-complaints");
  };

  return (
    <GlassLayout>
      <div className="max-w-xl mx-auto mt-10 rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-6">Edit Complaint</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input mb-4"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input mb-4"
        />

        <button
          onClick={handleUpdate}
          className="w-full rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Update
        </button>
      </div>
    </GlassLayout>
  );
}