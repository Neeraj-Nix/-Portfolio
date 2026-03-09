"use client";
import { motion } from "framer-motion";
import {
  FaPenNib,
  FaVideo,
  FaShareAlt,
  FaPlayCircle,
  FaPaintBrush,
} from "react-icons/fa";
const services = [
  {
    title: "Graphic Design",
    description:
      "Logos, branding, typography, and visual identities crafted to distinguish your brand.",
    icon: <FaPenNib size={32} />,
  },
  {
    title: "Video Editing",
    description:
      "Professional post-production, color grading, and audio mixing for cinematic narratives.",
    icon: <FaVideo size={32} />,
  },
  {
    title: "Motion Graphics",
    description:
      "Dynamic 2D/3D animations to bring data and static designs to life.",
    icon: <FaPlayCircle size={32} />,
  },
  {
    title: "Social Media Creatives",
    description:
      "Optimized reel edits, thumbnails, and posts designed for maximum engagement.",
    icon: <FaShareAlt size={32} />,
  },
  {
    title: "Branding Design",
    description:
      "Holistic brand guides ensuring cohesive visuals across all touchpoints.",
    icon: <FaPaintBrush size={32} />,
  },
];
export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {" "}
        <div className="text-center mb-16">
          {" "}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-4">
            My Services
          </h1>{" "}
          <p className="text-lg text-[#0066ff] dark:text-[#0066ff] max-w-2xl mx-auto">
            {" "}
            Combining creativity and technical capability to deliver premium
            digital assets tailored for your needs.{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {" "}
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 group"
            >
              {" "}
              <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                {" "}
                {service.icon}{" "}
              </div>{" "}
              <h3 className="text-2xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-3">
                {" "}
                {service.title}{" "}
              </h3>{" "}
              <p className="text-[#0066ff] dark:text-[#0066ff] leading-relaxed">
                {" "}
                {service.description}{" "}
              </p>{" "}
            </motion.div>
          ))}{" "}
        </div>{" "}
      </motion.div>{" "}
    </div>
  );
}
