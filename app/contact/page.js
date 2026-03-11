"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      setStatus({
        type: "success",
        msg: "Message sent successfully! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        msg: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
      {" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
        {" "}
        {/* Contact Info */}{" "}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {" "}
          <div>
            {" "}
            <h1 className="text-4xl md:text-5xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-4">
              Let&apos;s Connect
            </h1>{" "}
            <p className="text-[#0066ff] dark:text-[#0066ff] text-lg">
              {" "}
              Have a project in mind or just want to chat? Fill out the form and
              let&apos;s make it happen.{" "}
            </p>{" "}
          </div>{" "}
          <div className="space-y-6">
            {" "}
            <div className="flex items-center gap-4 text-[#0066ff] dark:text-[#0066ff]">
              {" "}
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                {" "}
                <FaEnvelope size={20} />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-sm text-[#0066ff]">Email</p>{" "}
                <p className="font-medium">Sandeeps939126@gmail.com</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex items-center gap-4 text-[#0066ff] dark:text-[#0066ff]">
              {" "}
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                {" "}
                <FaMapMarkerAlt size={20} />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-sm text-[#0066ff]">Location</p>{" "}
                <p className="font-medium">Swaroop Nagar, Samay Pur Badli, Delhi – 110042</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="pt-8">
            {" "}
            <p className="text-sm font-medium text-[#0066ff] mb-4 uppercase tracking-wider">
              Follow me
            </p>{" "}
            <div className="flex gap-4">
              {" "}
              <a
                href="https://www.instagram.com/kumarsandeeppp?igsh=bm1tMnh4ZXY5cmw0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#ffffff] dark:bg-[#ffffff] flex items-center justify-center text-[#0066ff] dark:text-[#0066ff] hover:bg-blue-600 hover:text-[#ffffff] dark:hover:bg-blue-600 dark:hover:text-[#ffffff] transition-colors"
                aria-label="Instagram"
              >
                {" "}
                <FaInstagram size={18} />{" "}
              </a>
              {" "}
              <a
                href="https://www.linkedin.com/in/sandeep-sharma-07859b249?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#ffffff] dark:bg-[#ffffff] flex items-center justify-center text-[#0066ff] dark:text-[#0066ff] hover:bg-blue-600 hover:text-[#ffffff] dark:hover:bg-blue-600 dark:hover:text-[#ffffff] transition-colors"
                aria-label="LinkedIn"
              >
                {" "}
                <FaLinkedin size={18} />{" "}
              </a>
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
        {/* Contact Form */}{" "}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {" "}
          <div className="bg-[#ffffff] dark:bg-[#ffffff] p-8 rounded-3xl border border-[#0066ff] dark:border-[#0066ff] shadow-xl">
            {" "}
            <h2 className="text-2xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-6">
              Send a Message
            </h2>{" "}
            {status.msg && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm ${status.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
              >
                {" "}
                {status.msg}{" "}
              </div>
            )}{" "}
            <form onSubmit={handleSubmit} className="space-y-6">
              {" "}
              <div>
                {" "}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2"
                >
                  Name
                </label>{" "}
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  placeholder="Name"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2"
                >
                  Email
                </label>{" "}
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  placeholder="Sandeep@example.com"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2"
                >
                  Message
                </label>{" "}
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                  placeholder="Tell me about your project..."
                />{" "}
              </div>{" "}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#ffffff] dark:bg-[#ffffff] text-[#0066ff] dark:text-[#0066ff] rounded-xl font-semibold hover:bg-[#ffffff] dark:hover:bg-[#ffffff] transition-colors disabled:opacity-50"
              >
                {" "}
                {loading ? "Sending..." : "Send Message"}{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </div>
  );
}
