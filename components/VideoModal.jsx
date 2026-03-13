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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
      >
        {" "}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl aspect-video bg-transparent rounded-2xl overflow-hidden"
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
          {(project.category === "Videos" || project.category === "Motion Graphics") && project.videoUrl ? (
            project.videoUrl.startsWith("data:video") || project.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-transparent"
              />
            ) : (
              <iframe
                src={(() => {
                  const url = project.videoUrl;
                  if (!url) return "";
                  if (url.includes("drive.google.com/file/d/")) {
                    const idMatch = url.match(/d\/([a-zA-Z0-9_-]+)/);
                    return idMatch ? `https://drive.google.com/file/d/${idMatch[1]}/preview` : url;
                  }
                  if (url.includes("youtube.com/watch")) {
                    return url.replace("watch?v=", "embed/").split("&")[0] + "?autoplay=1";
                  }
                  if (url.includes("youtu.be/")) {
                    const id = url.split("youtu.be/")[1]?.split("?")[0];
                    return `https://www.youtube.com/embed/${id}?autoplay=1`;
                  }
                  return url;
                })()}
                title={project.title}
                className="w-full h-full border-0 bg-transparent"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <img
              src={(() => {
                const url = project.mediaUrl;
                if (!url) return "";
                const driveMatch = url.match(/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
                if (driveMatch) {
                  return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
                }
                return url;
              })()}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </motion.div>{" "}
      </motion.div>{" "}
    </AnimatePresence>
  );
}
