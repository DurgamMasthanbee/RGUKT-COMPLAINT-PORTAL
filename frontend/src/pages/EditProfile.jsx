import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import GlassLayout from "../components/GlassLayout";

export default function EditProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${form._id}`,
        form
      );

      // ✅ UPDATE LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated ✅");

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlassLayout>
      <div className="max-w-xl mx-auto mt-10 rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <h2 className="text-2xl mb-6 font-bold text-white">Edit Profile</h2>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="input mb-3"
          placeholder="Full Name"
        />

        <input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          className="input mb-3"
          placeholder="Student ID"
        />

        <input
          name="email"
          value={form.email}
          disabled
          className="input mb-3 bg-white/10 text-white"
        />

        <button
          onClick={handleUpdate}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full py-3 rounded-3xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Save Changes
        </button>

      </div>
    </GlassLayout>
  );
}