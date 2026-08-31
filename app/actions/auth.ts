"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import crypto from "crypto";

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function signUpUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: "client" | "contractor";
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        role: data.role,
      },
    },
  });

  if (error) return { error: error.message };

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  await supabase.from("email_verifications").upsert({
    email: data.email,
    otp_hash: hashOtp(otp),
    expires_at: expiresAt,
  });

  // Send via Resend API directly (no SMTP)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: emailError } = await resend.emails.send({
    from: "Built4U <noreply@built4u.co.za>",
    to: data.email,
    subject: "Your Built4U verification code",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <img src="https://built4u.co.za/images/company_logo.png" alt="Built4U" width="160" style="margin-bottom:24px;" />
        <h2 style="color:#f97316;margin:0 0 8px;">Verify your email</h2>
        <p style="color:#374151;margin:0 0 24px;">Enter this code to complete your registration:</p>
        <div style="font-size:40px;font-weight:700;letter-spacing:16px;color:#111827;padding:24px;background:#f9fafb;border-radius:12px;text-align:center;">
          ${otp}
        </div>
        <p style="color:#9ca3af;font-size:13px;margin-top:16px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });

  if (emailError) return { error: "Failed to send verification email. Please try again." };

  return { success: true };
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const role = (data.user?.user_metadata?.role ?? "client") as "client" | "contractor";
  return { success: true, role };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function verifyOtp(email: string, token: string) {
  const supabase = await createClient();

  const { data: record, error: fetchError } = await supabase
    .from("email_verifications")
    .select("otp_hash, expires_at")
    .eq("email", email)
    .single();

  if (fetchError || !record) return { error: "Verification code not found. Please sign up again." };
  if (new Date() > new Date(record.expires_at)) return { error: "Verification code has expired. Please sign up again." };
  if (hashOtp(token) !== record.otp_hash) return { error: "Invalid verification code." };

  // Delete used OTP
  await supabase.from("email_verifications").delete().eq("email", email);

  // Get the session (user is logged in because email confirmation is disabled)
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const meta = user.user_metadata;
    const role = meta.role as "client" | "contractor";

    // Upsert so a retry after a failed signup doesn't blow up on duplicate key
    await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      role,
      // Fall back to a unique placeholder so NOT NULL + UNIQUE never blocks signup
      cellphone_number: meta.phone || `pending_${user.id}`,
      password_hash: "SUPABASE_AUTH_MANAGED",
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

    if (role === "client") {
      await supabase.from("client_profiles").upsert({
        user_id: user.id,
        first_name: meta.first_name ?? "",
        last_name: meta.last_name ?? "",
      }, { onConflict: "user_id" });
    } else {
      await supabase.from("contractor_profiles").upsert({
        user_id: user.id,
        first_name: meta.first_name ?? "",
        last_name: meta.last_name ?? "",
        entity_type: "individual",
      }, { onConflict: "user_id" });
    }
  }

  const role = (user?.user_metadata?.role ?? "client") as "client" | "contractor";
  return { success: true, role };
}
