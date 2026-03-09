"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/admin/login", formData);
      if (data.success) {
        router.push("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] rounded-3xl p-8 shadow-2xl"
      >
        {" "}
        <div className="text-center mb-8">
          {" "}
          <h1 className="text-3xl font-bold tracking-tighter text-[#0066ff] dark:text-[#0066ff]">
            Admin Login
          </h1>{" "}
          <p className="text-[#0066ff] dark:text-[#0066ff] mt-2">
            Sign in to manage your portfolio
          </p>{" "}
        </div>{" "}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium text-center">
            {" "}
            {error}{" "}
          </div>
        )}{" "}
        <form onSubmit={handleSubmit} className="space-y-6">
          {" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
              Username
            </label>{" "}
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
              Password
            </label>{" "}
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />{" "}
          </div>{" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ffffff] dark:bg-[#ffffff] text-[#0066ff] dark:text-[#0066ff] rounded-xl font-bold hover:bg-[#ffffff] dark:hover:bg-[#ffffff] transition-colors disabled:opacity-50"
          >
            {" "}
            {loading ? "Signing in..." : "Sign In"}{" "}
          </button>{" "}
        </form>{" "}
      </motion.div>{" "}
    </div>
  );
}
