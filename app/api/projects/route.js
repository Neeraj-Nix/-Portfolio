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
