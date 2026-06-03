import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    // In a real app, this would fetch from your backend via WebSocket or API
    setNotifications([
      {
        id: 1,
        title: "Complaint Submitted",
        message: "Your complaint has been submitted successfully",
        timestamp: new Date(Date.now() - 30 * 60000), // 30 mins ago
        read: false,
        type: "success",
      },
      {
        id: 2,
        title: "Status Updated",
        message: "Your complaint is now in progress",
        timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
        read: false,
        type: "info",
      },
      {
        id: 3,
        title: "Complaint Resolved",
        message: "Your complaint has been resolved",
        timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
        read: true,
        type: "success",
      },
    ]);

    const unread = 2; // Example unread count
    setUnreadCount(unread);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "🔔";
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full bg-white/10 text-slate-200 hover:bg-white/15 transition"
      >
        <Bell size={20} />

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 max-h-96 rounded-3xl border border-white/15 bg-slate-950/95 shadow-2xl backdrop-blur-2xl text-slate-200 overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Notifications</p>
                {unreadCount > 0 && (
                  <p className="text-xs text-slate-400">
                    {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell size={32} className="mx-auto mb-3 text-slate-400" />
                  <p className="text-slate-400 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`px-4 py-3 hover:bg-white/5 transition cursor-pointer group ${
                        !notif.read ? "bg-blue-500/5" : ""
                      }`}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">
                          {getNotificationIcon(notif.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatTime(notif.timestamp)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(notif.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 rounded transition"
                        >
                          <X size={14} className="text-red-400" />
                        </button>
                      </div>
                      {!notif.read && (
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notif.id);
                            }}
                            className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full hover:bg-blue-500/30 transition"
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex gap-2">
                <button className="flex-1 text-xs bg-white/10 hover:bg-white/15 text-slate-300 px-3 py-1.5 rounded-full transition">
                  View All
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-300 px-3 py-1.5 rounded-full transition"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
