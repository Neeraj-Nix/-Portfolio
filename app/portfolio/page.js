"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";
const CATEGORIES = ["All", "Graphics", "Videos", "Motion Graphics"];
export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects");
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  let filteredProjects = [];
  if (activeCategory === "All") {
    const graphics = projects.filter(p => p.category === "Graphics");
    const videos = projects.filter(p => p.category === "Videos");
    const motion = projects.filter(p => p.category === "Motion Graphics");
    
    // Interleave the arrays: one Graphic, one Video, one Motion Graphics repeating
    let maxLen = Math.max(graphics.length, videos.length, motion.length);
    for (let i = 0; i < maxLen; i++) {
      if (graphics[i]) filteredProjects.push(graphics[i]);
      if (videos[i]) filteredProjects.push(videos[i]);
      if (motion[i]) filteredProjects.push(motion[i]);
    }
  } else {
    filteredProjects = projects.filter((p) => p.category === activeCategory);
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      {" "}
      <div className="text-center mb-16">
        {" "}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-4"
        >
          {" "}
          My Work{" "}
        </motion.h1>{" "}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#0066ff] dark:text-[#0066ff] max-w-2xl mx-auto"
        >
          {" "}
          A selection of my best graphic design and video editing projects.{" "}
        </motion.p>{" "}
      </div>{" "}
      {/* Category Filters */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        {" "}
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-[#ffffff] text-[#0066ff] dark:bg-[#ffffff] dark:text-[#0066ff] shadow-md transform scale-105" : "bg-[#ffffff] text-[#0066ff] hover:bg-[#ffffff] dark:bg-[#ffffff] dark:text-[#0066ff] dark:hover:bg-[#ffffff]"}`}
          >
            {" "}
            {cat}{" "}
          </button>
        ))}{" "}
      </motion.div>{" "}
      {/* Project Grid */}{" "}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {" "}
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="aspect-[4/3] w-full bg-[#ffffff] dark:bg-[#ffffff] animate-pulse rounded-2xl"
            />
          ))}{" "}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {" "}
          <AnimatePresence>
            {" "}
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={(p) => setSelectedProject(p)}
              />
            ))}{" "}
          </AnimatePresence>{" "}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 text-[#0066ff] dark:text-[#0066ff]">
              {" "}
              No projects found in this category.{" "}
            </div>
          )}{" "}
        </motion.div>
      )}{" "}
      {/* Modal */}{" "}
      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />{" "}
    </div>
  );
}
