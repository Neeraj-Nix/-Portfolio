import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const message = await Contact.create(body);

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "Sandeeps939126@gmail.com",
        subject: `New Contact Form Submission from ${body.name}`,
        html: `
          <h3>You have a new message from your portfolio website!</h3>
          <p><strong>Name: </strong> ${body.name}</p>
          <p><strong>Email: </strong> ${body.email}</p>
          <p><strong>Message: </strong> ${body.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We still return success since the message was saved to the database.
      // But the email delivery failed (likely due to missing EMAIL_USER or EMAIL_PASS).
    }

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database offline. Please start your local MongoDB or use a cloud Atlas URI. Stack: " + error.message },
      { status: 400 },
    );
  }
}
