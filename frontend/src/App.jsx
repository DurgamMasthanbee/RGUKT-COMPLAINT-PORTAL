import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RaiseComplaint from "./pages/RaiseComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import MyComplaints from "./pages/MyComplaints";
import AllComplaints from "./pages/AllComplaints";
import Auth from "./pages/Auth";
import ViewComplaint from "./pages/ViewComplaint";
import EditComplaint from "./pages/EditComplaint";
import AdminLogin from "./pages/AdminLogin";
import Settings from "./pages/Settings";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <Router>
      <Navbar />

      <div className="pt-16 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/raise"
            element={
              <ProtectedRoute>
                <RaiseComplaint />
              </ProtectedRoute>
            }
          />

          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/my-complaints" element={<ProtectedRoute><MyComplaints /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          <Route path="/all-complaints" element={<AllComplaints />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/view" element={<ViewComplaint />} />
          <Route path="/edit" element={<EditComplaint />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}