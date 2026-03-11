import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 },
      );
    }
    
    // Vercel Free Tier limitations + MongoDB Document 16MB limit
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 5MB limit. Vercel doesn't allow large uploads. Please paste a Google Drive/YouTube link instead for large videos." },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create Base64 URI so it can be saved directly in the MongoDB string field instead of Vercel memory
    const mimeType = file.type || "application/octet-stream";
    const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
    
    return NextResponse.json({ success: true, url: base64Url });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
