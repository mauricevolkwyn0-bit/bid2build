"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = ["mrvolkwyn@gmail.com", "kekanaboykie@gmail.com"];

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) return { error: "Failed to save your message. Please try again." };

  try {
    await resend.emails.send({
      from: "Bid2Build Contact <noreply@bid2build.co.za>",
      to: ADMIN_EMAILS,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#ea580c">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:600;color:#111">Name</td><td style="padding:8px 0;color:#374151">${data.name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#111">Email</td><td style="padding:8px 0;color:#374151"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600;color:#111">Subject</td><td style="padding:8px 0;color:#374151">${data.subject}</td></tr>
          </table>
          <hr style="margin:16px 0;border-color:#e5e7eb"/>
          <p style="font-weight:600;color:#111;margin-bottom:8px">Message</p>
          <p style="color:#374151;white-space:pre-wrap">${data.message}</p>
        </div>
      `,
    });
  } catch {
    // Email failure doesn't fail the submission
  }

  return { success: true };
}
