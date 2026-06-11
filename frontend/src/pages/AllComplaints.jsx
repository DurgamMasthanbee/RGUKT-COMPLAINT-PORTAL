import { useEffect, useState } from "react";

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("https://rgukt-complaint-portal.onrender.com/api/complaints")
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-white">All Complaints</h1>

      {complaints.map((item) => (
        <div
          key={item._id}
          className="p-5 rounded-3xl mb-4 border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-900/20"
        >
          <h2 className="font-semibold text-xl text-white mb-2">{item.title}</h2>
          <p className="text-slate-300 mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span>Category: {item.category}</span>
            <span>Status: {item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}