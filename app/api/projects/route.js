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
    // Removed static image serving to ensure clean database state
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
