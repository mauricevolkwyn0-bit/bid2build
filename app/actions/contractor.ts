"use server";

import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function updateContractorProfile(
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
    entityType: string;
    companyName: string;
    companyRegNumber: string;
    taxNumber: string;
    isVatRegistered: boolean;
    vatNumber: string;
    isNhbrcRegistered: boolean;
    nhbrcLevel: string;
  }
) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    },
  });

  if (authError) return { error: authError.message };

  const { error: profileError } = await supabase
    .from("contractor_profiles")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      address_line_1: data.addressLine1 || null,
      address_line_2: data.addressLine2 || null,
      city: data.city || null,
      province: data.province || null,
      postal_code: data.postalCode || null,
      entity_type: data.entityType,
      company_name: data.companyName || null,
      company_registration_number: data.companyRegNumber || null,
      tax_number: data.taxNumber || null,
      is_vat_registered: data.isVatRegistered,
      vat_number: data.vatNumber || null,
      is_nhbrc_registered: data.isNhbrcRegistered,
      nhbrc_level: data.isNhbrcRegistered ? (data.nhbrcLevel || null) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (profileError) return { error: profileError.message };

  await supabase
    .from("users")
    .update({ cellphone_number: data.phone, updated_at: new Date().toISOString() })
    .eq("id", userId);

  return { success: true };
}

export async function initiateBidPayment(data: {
  jobId: string;
  bidAmount: string;
  message: string;
  proposedStartDate: string;
  proposedDurationDays: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { data: job } = await supabase
    .from("jobs").select("id, status, title").eq("id", data.jobId).single();
  if (!job || job.status !== "open") return { error: "This job is no longer available." };

  const { data: existing } = await supabase
    .from("bids").select("id").eq("job_id", data.jobId).eq("contractor_id", user.id).maybeSingle();
  if (existing) return { error: "You have already submitted a bid on this job." };

  const { data: profile } = await supabase
    .from("contractor_profiles").select("first_name, last_name").eq("user_id", user.id).single();

  // Store bid data in the payment record until payment is confirmed
  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .insert({
      user_id: user.id,
      purpose: JSON.stringify({
        jobId: data.jobId,
        contractorId: user.id,
        bidAmount: data.bidAmount,
        message: data.message,
        proposedStartDate: data.proposedStartDate,
        proposedDurationDays: data.proposedDurationDays,
      }),
      amount: 200,
      currency: "ZAR",
      status: "pending",
      gateway: "PayFast",
    })
    .select("id")
    .single();

  if (paymentError || !payment) return { error: "Failed to initiate payment." };

  const merchantId  = process.env.PAYFAST_MERCHANT_ID!;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY!;
  const passphrase  = process.env.PAYFAST_PASSPHRASE ?? "";
  const appUrl      = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const sandbox     = process.env.PAYFAST_SANDBOX === "true";
  const baseUrl     = sandbox ? "https://sandbox.payfast.co.za" : "https://www.payfast.co.za";

  const params: Record<string, string> = {
    merchant_id:   merchantId,
    merchant_key:  merchantKey,
    return_url:    `${appUrl}/dashboard/contractor/jobs/${data.jobId}?payment=success`,
    cancel_url:    `${appUrl}/dashboard/contractor/jobs/${data.jobId}?payment=cancelled`,
    notify_url:    `${appUrl}/api/payfast/notify`,
    name_first:    profile?.first_name ?? "",
    name_last:     profile?.last_name  ?? "",
    email_address: user.email ?? "",
    m_payment_id:  payment.id,
    amount:        "200.00",
    item_name:     "Bid Fee - Bid2Build",
  };

  // Generate MD5 signature
  const pfString = Object.entries(params)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");
  const toHash = passphrase ? `${pfString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}` : pfString;
  const signature = crypto.createHash("md5").update(toHash).digest("hex");

  try {
    const res = await fetch(`${baseUrl}/onsite/process`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ...params, signature }).toString(),
    });
    if (!res.ok) return { error: `PayFast error: ${await res.text()}` };
    const { uuid } = await res.json();
    return { uuid, sandbox };
  } catch {
    return { error: "Could not connect to PayFast. Please try again." };
  }
}

export async function submitBid(data: {
  jobId: string;
  bidAmount: string;
  message: string;
  proposedStartDate: string;
  proposedDurationDays: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  // Check job is still open
  const { data: job } = await supabase
    .from("jobs")
    .select("id, status")
    .eq("id", data.jobId)
    .single();

  if (!job) return { error: "Job not found." };
  if (job.status !== "open") return { error: "This job is no longer accepting bids." };

  // Check contractor hasn't already bid
  const { data: existing } = await supabase
    .from("bids")
    .select("id")
    .eq("job_id", data.jobId)
    .eq("contractor_id", user.id)
    .single();

  if (existing) return { error: "You have already submitted a bid on this job." };

  const { error } = await supabase.from("bids").insert({
    job_id: data.jobId,
    contractor_id: user.id,
    bid_amount: Number(data.bidAmount),
    message: data.message || null,
    proposed_start_date: data.proposedStartDate || null,
    proposed_duration_days: data.proposedDurationDays ? Number(data.proposedDurationDays) : null,
    bid_fee_amount: 0,
    status: "pending",
  });

  if (error) return { error: error.message };
  return { success: true };
}
