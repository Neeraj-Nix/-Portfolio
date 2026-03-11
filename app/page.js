"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get("/api/projects");
        if (data.success) {
          const projects = data.data;
          // Get exactly one of each requested category
          const graphic = projects.find(p => p.category === "Graphics");
          const video = projects.find(p => p.category === "Videos");
          const motion = projects.find(p => p.category === "Motion Graphics");
          
          setFeaturedProjects([graphic, video, motion].filter(Boolean));
        }
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#ffffff] dark:bg-[#ffffff]">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          <span className="px-4 py-2 rounded-full border border-[#0066ff] dark:border-[#0066ff] text-sm font-semibold tracking-wide text-[#0066ff] dark:text-[#0066ff] bg-[#ffffff] dark:bg-[#ffffff] backdrop-blur-md">
            Available for freelance work
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0066ff] dark:text-[#0066ff]"
        >
          Graphic Designer & <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Video Editor
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#0066ff] dark:text-[#0066ff]"
        >
          I bring ideas to life through visually stunning design and captivating
          motion graphics. Let&apos;s create something extraordinary together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-[#ffffff] dark:bg-[#ffffff] text-[#0066ff] dark:text-[#0066ff] rounded-full font-semibold hover:bg-[#ffffff] dark:hover:bg-[#ffffff] transition-colors shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#ffffff] dark:bg-[#ffffff] text-[#0066ff] dark:text-[#0066ff] border border-[#0066ff] dark:border-[#0066ff] rounded-full font-semibold hover:bg-[#000000]/5 dark:hover:bg-[#ffffff]/5 transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#0066ff]/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-[#0066ff]/80 max-w-2xl mx-auto">
              A curated selection of my finest graphic design, video editing, and motion graphics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard 
                key={project._id || idx} 
                project={project} 
                onClick={(p) => setSelectedProject(p)} 
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#0066ff] text-[#0066ff] rounded-full font-medium hover:bg-[#0066ff] hover:text-[#ffffff] transition-all"
            >
              See All Projects
            </Link>
          </div>
        </div>
      )}

      {/* Video Modal Component */}
      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}
