"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
export default function VideoModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;
  return (
    <AnimatePresence>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ffffff] backdrop-blur-sm p-4 md:p-8"
      >
        {" "}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl aspect-video bg-[#ffffff] rounded-2xl overflow-hidden shadow-2xl"
        >
          {" "}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[#ffffff] hover:bg-[#ffffff] text-[#0066ff] rounded-full backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            {" "}
            <FiX size={24} />{" "}
          </button>{" "}
          {project.category === "Videos" && project.videoUrl ? (
            <iframe
              src={
                project.videoUrl.replace("watch?v=", "embed/").split("&")[0] +
                "?autoplay=1"
              }
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}{" "}
        </motion.div>{" "}
      </motion.div>{" "}
    </AnimatePresence>
  );
}
