export default function Footer() {
  return (
    <footer className="bg-slate-950/90 text-slate-300 border-t border-white/10 backdrop-blur-3xl px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">RGUKT Ongole</h2>
          <p className="text-slate-400">
            Rajiv Gandhi University of Knowledge Technologies, Ongole. Transparent grievance management for every student.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <p className="hover:text-white transition">Home</p>
          <p className="hover:text-white transition">Raise Complaint</p>
          <p className="hover:text-white transition">Track Complaint</p>
          <p className="hover:text-white transition">Contact</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="text-slate-400">✉ complaints@rguktong.ac.in</p>
          <p className="text-slate-400">☎ +91 8594 220 100</p>
          <p className="text-slate-400">📍 RGUKT Ongole, Prakasam, Andhra Pradesh</p>
        </div>

      </div>

      <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
        <p>© 2026 RGUKT Ongole. All rights reserved. Student Grievance Redressal Portal.</p>
      </div>
    </footer>
  );
}