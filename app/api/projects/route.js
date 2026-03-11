import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    let projects = [];
    try {
      await dbConnect();
      const dbProjects = await Project.find({}).sort({ createdAt: -1 });
      projects = dbProjects.map((p) => p.toObject());
    } catch (dbError) {
      console.warn(
        "MongoDB connection failed, serving static files only.",
        dbError.message,
      );
    }
    /* Add static images from public/img */
    try {
      const imgDir = path.join(process.cwd(), "public", "img");
      if (fs.existsSync(imgDir)) {
        const files = fs.readdirSync(imgDir);
        const staticProjects = files
          .filter((file) => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
          .map((file, index) => ({
            _id: `static-img-${index}`,
            title: path.basename(file, path.extname(file)),
            description: "Graphic Design",
            category: "Graphics",
            mediaUrl: `/img/${file}`,
            createdAt: new Date().toISOString(),
          }));
        projects = [...projects, ...staticProjects];
      }
    } catch (fsError) {
      console.error("Error reading static images:", fsError);
    }
    /* Add static videos from public/vid */
    try {
      const vidDir = path.join(process.cwd(), "public", "vid");
      if (fs.existsSync(vidDir)) {
        const files = fs.readdirSync(vidDir);
        const staticVideos = files
          .filter((file) => file.match(/\.(mp4|webm|ogg)$/i))
          .map((file, index) => ({
            _id: `static-vid-${index}`,
            title: path.basename(file, path.extname(file)),
            description: "Video Work",
            category: "Videos",
            mediaUrl: "",
            videoUrl: `/vid/${file}`,
            createdAt: new Date().toISOString(),
          }));
        projects = [...projects, ...staticVideos];
      }
    } catch (vidError) {
      console.error("Error reading static videos:", vidError);
    }
    /* Add static motion graphics from public/mg */
    try {
      const mgDir = path.join(process.cwd(), "public", "mg");
      if (fs.existsSync(mgDir)) {
        const files = fs.readdirSync(mgDir);
        const staticMgVideos = files
          .filter((file) => file.match(/\.(mp4|webm|ogg)$/i))
          .map((file, index) => ({
            _id: `static-mg-${index}`,
            title: path.basename(file, path.extname(file)),
            description: "Motion Graphics Work",
            category: "Motion Graphics",
            mediaUrl: "",
            videoUrl: `/mg/${file}`,
            createdAt: new Date().toISOString(),
          }));
        projects = [...projects, ...staticMgVideos];
      }
    } catch (mgError) {
      console.error("Error reading static motion graphics:", mgError);
    }
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
