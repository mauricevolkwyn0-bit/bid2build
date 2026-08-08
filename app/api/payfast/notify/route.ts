import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { NextResponse } from "next/server";

function verifySignature(params: Record<string, string>, passphrase: string): boolean {
  const { signature, ...rest } = params;
  const pfString = Object.entries(rest)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");
  const toHash = passphrase
    ? `${pfString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : pfString;
  const expected = crypto.createHash("md5").update(toHash).digest("hex");
  return expected === signature;
}

export async function POST(req: Request) {
  const text = await req.text();
  const params = Object.fromEntries(new URLSearchParams(text));

  const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";
  if (!verifySignature(params, passphrase)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (params.payment_status !== "COMPLETE") {
    return NextResponse.json({ ok: true });
  }

  const paymentId = params.m_payment_id;
  if (!paymentId) return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });

  const supabase = await createClient();

  // Fetch the pending payment record
  const { data: payment } = await supabase
    .from("payments")
    .select("id, purpose, user_id, status")
    .eq("id", paymentId)
    .single();

  if (!payment || payment.status !== "pending") {
    return NextResponse.json({ ok: true });
  }

  let bidData: {
    jobId: string;
    contractorId: string;
    bidAmount: string;
    message: string;
    proposedStartDate: string;
    proposedDurationDays: string;
  };

  try {
    bidData = JSON.parse(payment.purpose);
  } catch {
    return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
  }

  // Create the bid
  const { data: bid, error: bidError } = await supabase
    .from("bids")
    .insert({
      job_id: bidData.jobId,
      contractor_id: bidData.contractorId,
      bid_amount: Number(bidData.bidAmount),
      message: bidData.message || null,
      proposed_start_date: bidData.proposedStartDate || null,
      proposed_duration_days: bidData.proposedDurationDays ? Number(bidData.proposedDurationDays) : null,
      bid_fee_amount: 200,
      payment_id: payment.id,
      status: "pending",
    })
    .select("id")
    .single();

  if (bidError) {
    return NextResponse.json({ error: bidError.message }, { status: 500 });
  }

  // Mark payment as settled and link to bid
  await supabase
    .from("payments")
    .update({
      status: "settled",
      bid_id: bid.id,
      gateway_reference: params.pf_payment_id ?? null,
      settled_at: new Date().toISOString(),
    })
    .eq("id", paymentId);

  return NextResponse.json({ ok: true });
}
