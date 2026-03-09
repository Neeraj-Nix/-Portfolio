"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("/api/contact");
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div className="text-[#0066ff] animate-pulse">Loading messages...</div>
    );
  if (error)
    return <div className="text-red-500">Error loading messages: {error}</div>;
  return (
    <div className="max-w-4xl">
      {" "}
      <h1 className="text-3xl font-bold tracking-tighter text-[#0066ff] dark:text-[#0066ff] mb-8">
        Inbox
      </h1>{" "}
      {messages.length === 0 ? (
        <div className="p-8 text-center bg-[#ffffff] dark:bg-[#ffffff] rounded-3xl text-[#0066ff] dark:text-[#0066ff]">
          {" "}
          No messages found.{" "}
        </div>
      ) : (
        <div className="space-y-4">
          {" "}
          {messages.map((message, idx) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              {" "}
              <div className="flex justify-between items-start mb-4">
                {" "}
                <div>
                  {" "}
                  <h3 className="text-lg font-bold text-[#0066ff] dark:text-[#0066ff]">
                    {message.name}
                  </h3>{" "}
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {" "}
                    {message.email}{" "}
                  </a>{" "}
                </div>{" "}
                <span className="text-xs text-[#0066ff] font-medium bg-[#ffffff] dark:bg-[#ffffff] px-3 py-1 rounded-full">
                  {" "}
                  {new Date(message.createdAt).toLocaleDateString()}{" "}
                </span>{" "}
              </div>{" "}
              <p className="text-[#0066ff] dark:text-[#0066ff] whitespace-pre-wrap">
                {message.message}
              </p>{" "}
            </motion.div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}
