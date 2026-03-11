"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaEdit, FaPlus, FaImage, FaVideo } from "react-icons/fa";
export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const initialForm = {
    title: "",
    description: "",
    category: "Graphics",
    mediaUrl: "",
    videoUrl: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects");
      if (data.success) setProjects(data.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    let generatedThumbnail = null;
    let isVideo = file.type.startsWith("video/");

    // Auto-extract thumbnail for videos
    if (isVideo) {
      try {
        generatedThumbnail = await new Promise((resolve, reject) => {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(file);
          video.muted = true;
          video.onloadedmetadata = () => {
            video.currentTime = Math.min(1, video.duration / 2); // Frame at 1 sec
          };
          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
            URL.revokeObjectURL(video.src);
          };
          video.onerror = () => resolve(null); // Fallback if extraction fails
        });
      } catch (err) {
        console.error("Thumbnail extraction failed");
      }
    }

    const data = new FormData();
    data.append("file", file);
    try {
      const res = await axios.post("/api/upload", data);
      if (res.data.success) {
        setFormData((prev) => ({ 
          ...prev, 
          // Set the base64 Video URL if video, otherwise set the normal Image URL
          videoUrl: isVideo ? res.data.url : prev.videoUrl,
          // Set the auto-extracted Thumbnail if video, otherwise set the normal Image URL
          mediaUrl: isVideo && generatedThumbnail ? generatedThumbnail : res.data.url,
          category: isVideo ? "Videos" : "Graphics"
        }));
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.response?.data?.error || "File upload failed.");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, formData);
      } else {
        await axios.post("/api/projects", formData);
      }
      setIsModalOpen(false);
      setFormData(initialForm);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project", err);
      alert("Error saving project");
    }
  };
  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project._id);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };
  const openNewModal = () => {
    setFormData(initialForm);
    setEditingId(null);
    setIsModalOpen(true);
  };
  if (loading)
    return (
      <div className="text-[#0066ff] animate-pulse">Loading projects...</div>
    );
  return (
    <div className="max-w-6xl mx-auto">
      {" "}
      <div className="flex justify-between items-center mb-8">
        {" "}
        <h1 className="text-3xl font-bold tracking-tighter text-[#0066ff] dark:text-[#0066ff]">
          Manage Projects
        </h1>{" "}
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-[#ffffff] hover:bg-gray-50 text-[#0066ff] px-5 py-2.5 rounded-xl font-bold border border-[#0066ff] transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {projects.map((project) => (
          <motion.div
            key={project._id}
            layout
            className="bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] rounded-2xl overflow-hidden shadow-sm"
          >
            {" "}
            <div className="aspect-video relative bg-[#ffffff] dark:bg-[#ffffff]">
              {" "}
              {project.mediaUrl ? (
                <img
                  src={(() => {
                    const url = project.mediaUrl;
                    if (!url) return "";
                    if (url.includes("drive.google.com/file/d/")) {
                      const idMatch = url.match(/d\/([a-zA-Z0-9_-]+)/);
                      return idMatch ? `https://drive.google.com/uc?export=view&id=${idMatch[1]}` : url;
                    }
                    if (url.includes("drive.google.com/open?id=")) {
                      const id = url.split("id=")[1]?.split("&")[0];
                      return `https://drive.google.com/uc?export=view&id=${id}`;
                    }
                    return url;
                  })()}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[#0066ff]">
                  {" "}
                  <FaImage size={32} />{" "}
                </div>
              )}{" "}
              <div className="absolute top-3 left-3 bg-[#ffffff] backdrop-blur text-[#0066ff] text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                {" "}
                {project.category === "Videos" || project.category === "Motion Graphics" ? <FaVideo /> : <FaImage />}{" "}
                {project.category}{" "}
              </div>{" "}
            </div>{" "}
            <div className="p-5">
              {" "}
              <h3 className="text-lg font-bold text-[#0066ff] dark:text-[#0066ff] mb-1 truncate">
                {project.title}
              </h3>{" "}
              <p className="text-sm text-[#0066ff] dark:text-[#0066ff] line-clamp-2 mb-4">
                {project.description}
              </p>{" "}
              <div className="flex gap-2">
                {" "}
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-[#ffffff] dark:bg-[#ffffff] hover:bg-[#ffffff] dark:hover:bg-[#ffffff] text-[#0066ff] dark:text-[#0066ff] rounded-lg text-sm font-medium transition-colors"
                >
                  {" "}
                  <FaEdit /> Edit{" "}
                </button>{" "}
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                >
                  {" "}
                  <FaTrash /> Delete{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>
        ))}{" "}
      </div>{" "}
      {/* Project Modal */}{" "}
      <AnimatePresence>
        {" "}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ffffff] backdrop-blur-sm p-4">
            {" "}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#ffffff] dark:bg-[#ffffff] w-full max-w-2xl rounded-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh] border border-[#0066ff] dark:border-[#0066ff] shadow-2xl"
            >
              {" "}
              <h2 className="text-2xl font-bold text-[#0066ff] dark:text-[#0066ff] mb-6">
                {" "}
                {editingId ? "Edit Project" : "Add New Project"}{" "}
              </h2>{" "}
              <form onSubmit={handleSubmit} className="space-y-5">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
                      Title
                    </label>{" "}
                    <input
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:ring-2 focus:ring-blue-500"
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
                      Category
                    </label>{" "}
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:ring-2 focus:ring-blue-500"
                    >
                      {" "}
                      <option value="Graphics">Graphics</option>{" "}
                      <option value="Videos">Videos</option>{" "}
                      <option value="Motion Graphics">Motion Graphics</option>{" "}
                    </select>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
                    Description
                  </label>{" "}
                  <textarea
                    required
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:ring-2 focus:ring-blue-500"
                  />{" "}
                </div>{" "}
                <div>
                  <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
                    Thumbnail Image / Drive Link
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      name="mediaUrl"
                      type="text"
                      placeholder="Paste image/link directly (e.g. Google Drive image link)..."
                      value={formData.mediaUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-4 items-center">
                      <span className="text-sm text-gray-500">OR Upload from device:</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {uploading && (
                        <span className="text-sm text-blue-500 animate-pulse">Uploading...</span>
                      )}
                    </div>
                  </div>
                </div>
                {["Videos", "Motion Graphics"].includes(formData.category) && (
                  <div>
                    {" "}
                    <label className="block text-sm font-medium text-[#0066ff] dark:text-[#0066ff] mb-2">
                      Video Embed URL (e.g. YouTube/Vimeo)
                    </label>{" "}
                    <input
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffff] dark:bg-[#ffffff] border border-[#0066ff] dark:border-[#0066ff] focus:ring-2 focus:ring-blue-500"
                    />{" "}
                  </div>
                )}{" "}
                <div className="pt-6 flex justify-end gap-3 border-t border-[#0066ff] dark:border-[#0066ff] mt-6">
                  {" "}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-medium text-[#0066ff] dark:text-[#0066ff] bg-[#ffffff] dark:bg-[#ffffff] hover:bg-[#ffffff] dark:hover:bg-[#ffffff] transition-colors"
                  >
                    {" "}
                    Cancel{" "}
                  </button>{" "}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-3 rounded-xl font-bold text-[#0066ff] bg-[#ffffff] border border-[#0066ff] hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    Save Project
                  </button>
                </div>{" "}
              </form>{" "}
            </motion.div>{" "}
          </div>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
