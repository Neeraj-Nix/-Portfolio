"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";
export default function About() {
  const skills = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Premiere Pro",
    "After Effects",
    "Motion Graphics",
    "Figma",
    "DaVinci Resolve",
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {" "}
        <h1 className="text-4xl md:text-5xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-8">
          About Me
        </h1>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {" "}
          {/* Bio Section */}{" "}
          <div className="space-y-6 text-[#0066ff] dark:text-[#0066ff] text-lg leading-relaxed">
            {" "}
            <p>
              {" "}
              Hi, I&apos;m Sandeep. A creative and detail-oriented Video
              Editor & Graphic Designer with 3.5 years of experience turning
              ideas into scroll-stopping visuals. I specialize in video editing,
              motion graphics, and creative design, creating content that grabs
              attention and keeps audiences engaged. Skilled in short-form and
              long-form video editing, digital design, and storytelling, I use
              Adobe Creative Suite and modern AI tools to craft visuals that are
              not only appealing but also trend-driven and impactful, helping
              brands grow their presence.{" "}
            </p>{" "}
            <p>
              {" "}
              I believe that great design is not just about making things look
              beautiful—it&apos;s about effective communication and
              problem-solving through visual media.{" "}
            </p>{" "}
            <div className="pt-6">
              {" "}
              <h2 className="text-2xl font-semibold text-[#0066ff] dark:text-[#0066ff] mb-4 flex items-center gap-2">
                {" "}
                <FaCode className="text-blue-500" /> Core Skills{" "}
              </h2>{" "}
              <div className="flex gap-3 flex-wrap">
                {" "}
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] rounded-full text-sm font-medium text-[#0066ff] dark:text-[#0066ff]"
                  >
                    {" "}
                    {skill}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Timeline Section */}{" "}
          <div className="space-y-8">
            {" "}
            <div>
              {" "}
              <h2 className="text-2xl font-semibold text-[#0066ff] dark:text-[#0066ff] mb-6 flex items-center gap-2">
                {" "}
                <FaBriefcase className="text-blue-500" /> Experience{" "}
              </h2>{" "}
              <div className="space-y-6">
                {" "}
                {[
                  {
                    role: "Video Editor & Graphic Designer",
                    company: " Coffee & Creatives",
                    year: "FEB 2025 – PRESENT",
                  },
                   {
                    role: "Video Editor & Graphic Designer",
                    company: "MEDIA SINGH",
                    year: "FEB 2024 – FEB 2025",
                  },
                   {
                    role: "Video Editor & Graphic Designer",
                    company: "BROZ MEDIA",
                    year: "SEP 2023 – FEB 2024",
                  },
                  {
                    role: "Freelance Graphic Designer",
                    company: "Self-Employed",
                    year: "2022 – Present",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="pl-4 border-l-2 border-blue-500 relative"
                  >
                    {" "}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />{" "}
                    <h3 className="font-bold text-[#0066ff] dark:text-[#0066ff]">
                      {item.role}
                    </h3>{" "}
                    <p className="text-sm text-[#0066ff] dark:text-[#0066ff]">
                      {item.company} &bull; {item.year}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div className="pt-4">
              {" "}
              <h2 className="text-2xl font-semibold text-[#0066ff] dark:text-[#0066ff] mb-6 flex items-center gap-2">
                {" "}
                <FaGraduationCap className="text-blue-500" /> Education{" "}
              </h2>{" "}
              <div className="pl-4 border-l-2 border-purple-500 relative">
                {" "}
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />{" "}
                <h3 className="font-bold text-[#0066ff] dark:text-[#0066ff]">
                  BA in Digital Media Arts
                </h3>{" "}
                <p className="text-sm text-[#0066ff] dark:text-[#0066ff]">
                  Design University &bull; 2015 - 2019
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </motion.div>{" "}
    </div>
  );
}
