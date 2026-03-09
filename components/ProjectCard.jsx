"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
export default function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-[#ffffff] dark:bg-[#ffffff] shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {" "}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {" "}
        <Image
          src={project.mediaUrl}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />{" "}
        {/* Overlay for Video Type Projects */}{" "}
        {project.category === "Videos" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {" "}
            <div className="bg-[#ffffff] dark:bg-[#ffffff] rounded-full p-4 shadow-lg text-blue-600 dark:text-blue-500 transform transition-transform group-hover:scale-110">
              {" "}
              <FaPlay size={24} className="ml-1" />{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* Hover Info Overlay */}{" "}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          {" "}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            {" "}
            <p className="text-sm font-medium text-blue-400 mb-2 uppercase tracking-wider">
              {project.category}
            </p>{" "}
            <h3 className="text-2xl font-bold text-[#0066ff] mb-2">
              {project.title}
            </h3>{" "}
            <p className="text-[#0066ff] text-sm line-clamp-2">
              {project.description}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
