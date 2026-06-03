import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, Lock, LogOut, Save } from "lucide-react";
import GlassLayout from "../components/GlassLayout";
import Button from "../components/Button";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profilePublic: false,
      complaintsPublic: false,
    },
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    setUser(storedUser);

    // Load settings from localStorage
    const storedSettings = JSON.parse(
      localStorage.getItem("userSettings") || "{}"
    );
    setSettings({ ...settings, ...storedSettings });
  }, []);

  const handleThemeToggle = (theme) => {
    setSettings({ ...settings, theme });
    setSaved(false);
  };

  const handleNotificationToggle = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
    setSaved(false);
  };

  const handlePrivacyToggle = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
    setSaved(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/auth");
    }
  };

  return (
    <GlassLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">⚙️ Settings</h1>
          <p className="text-slate-300">Manage your preferences and account settings</p>
        </motion.div>

        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 mb-6 text-emerald-300"
          >
            ✅ Settings saved successfully
          </motion.div>
        )}

        <div className="grid gap-6">
          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Moon size={24} /> Appearance
            </h2>

            <div className="space-y-4">
              <p className="text-slate-300 mb-4">Choose your preferred theme</p>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeToggle("dark")}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    settings.theme === "dark"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <Moon size={24} className="mx-auto mb-2 text-slate-200" />
                  <p className="font-semibold text-slate-200">Dark</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeToggle("light")}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    settings.theme === "light"
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <Sun size={24} className="mx-auto mb-2 text-slate-200" />
                  <p className="font-semibold text-slate-200">Light</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeToggle("auto")}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    settings.theme === "auto"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="mx-auto mb-2">⚡</div>
                  <p className="font-semibold text-slate-200">Auto</p>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Bell size={24} /> Notifications
            </h2>

            <div className="space-y-4">
              {[
                {
                  key: "email",
                  label: "Email Notifications",
                  description: "Get updates via email about your complaints",
                },
                {
                  key: "push",
                  label: "Push Notifications",
                  description: "Receive browser notifications for updates",
                },
                {
                  key: "sms",
                  label: "SMS Notifications",
                  description: "Get urgent updates via SMS (Extra charges may apply)",
                },
              ].map((notif) => (
                <div
                  key={notif.key}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition"
                >
                  <div>
                    <p className="font-semibold text-white">{notif.label}</p>
                    <p className="text-sm text-slate-400">{notif.description}</p>
                  </div>

                  <label className="relative inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications[notif.key]}
                      onChange={() => handleNotificationToggle(notif.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock size={24} /> Privacy & Security
            </h2>

            <div className="space-y-4">
              {[
                {
                  key: "profilePublic",
                  label: "Public Profile",
                  description: "Allow others to see your profile information",
                },
                {
                  key: "complaintsPublic",
                  label: "Public Complaints",
                  description: "Allow others to see your complaint categories",
                },
              ].map((privacy) => (
                <div
                  key={privacy.key}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition"
                >
                  <div>
                    <p className="font-semibold text-white">{privacy.label}</p>
                    <p className="text-sm text-slate-400">{privacy.description}</p>
                  </div>

                  <label className="relative inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy[privacy.key]}
                      onChange={() => handlePrivacyToggle(privacy.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Account</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-slate-400 mb-2">Logged in as</p>
                <p className="font-semibold text-white">{user?.fullName}</p>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="w-full bg-white/10 hover:bg-white/15 text-white">
                  <Lock size={18} className="inline mr-2" />
                  Change Password
                </Button>

                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-300"
                >
                  <LogOut size={18} className="inline mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4"
          >
            <Button
              onClick={handleSaveSettings}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Save size={18} className="inline mr-2" />
              Save Settings
            </Button>
          </motion.div>
        </div>
      </div>
    </GlassLayout>
  );
}
