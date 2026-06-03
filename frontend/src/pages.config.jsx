import Home from "./pages/Home";
import RaiseComplaint from "./pages/RaiseComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export const pagesConfig = [
  { path: "/", element: <Home /> },
  { path: "/raise-complaint", element: <RaiseComplaint /> },
  { path: "/track-complaint", element: <TrackComplaint /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin", element: <Admin /> },
];