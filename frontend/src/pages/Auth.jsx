import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const rguktEmailRegex = /^[oO][0-9]+@rgukt\.ac\.in$/;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!rguktEmailRegex.test(value)) {
      return "Only official RGUKT email IDs are allowed (Example: O210535@rgukt.ac.in)";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    else if (!rguktEmailRegex.test(form.email)) newErrors.email = "Only official RGUKT email IDs are allowed (Example: O210535@rgukt.ac.in)";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!form.fullName) newErrors.fullName = "Full name is required";
      if (!form.studentId) newErrors.studentId = "Student ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://rgukt-complaint-portal.onrender.com/api/users/login",
          {
            email: form.email,
            password: form.password,
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("storage"));

      } else {
        await axios.post(
          "https://rgukt-complaint-portal.onrender.com/api/users/signup",
          {
            fullName: form.fullName,
            studentId: form.studentId,
            email: form.email,
            password: form.password,
          }
        );

        // Switch to login mode
        setIsLogin(true);
        setForm({
          fullName: "",
          email: form.email,
          password: "",
          studentId: "",
        });
        return;
      }

      if (location.state?.category) {
        navigate("/raise", {
          state: { category: location.state.category },
        });
      } else {
        navigate("/profile");
      }

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >

        <Card variant="glass" className="border-white/30">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-300">
              {isLogin ? "Sign in to your account" : "Join our community"}
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
              >
                {errors.submit}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Signup Extra Fields */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="space-y-4"
                >
                  <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="John Doe"
                    icon={User}
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                  />

                  <Input
                    label="Student ID"
                    name="studentId"
                    placeholder="23A91F0001"
                    value={form.studentId}
                    onChange={handleChange}
                    error={errors.studentId}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Fields */}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full group"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Message from Navigation */}
            {location.state?.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-center text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20"
              >
                {location.state.message}
              </motion.p>
            )}
          </form>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-300 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-blue-300 font-semibold hover:text-blue-200 transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </motion.button>
            </p>
          </motion.div>
        </Card>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 text-xs mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}
