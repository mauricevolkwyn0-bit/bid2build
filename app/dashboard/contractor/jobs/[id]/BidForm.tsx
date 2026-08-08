"use client";

import { useState } from "react";
import Script from "next/script";
import { initiateBidPayment } from "@/app/actions/contractor";

const inputClass = "rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

declare global {
  interface Window {
    payfast_do_onsite_payment: (
      opts: { uuid: string },
      callback: (result: { payment_status: string }) => void
    ) => void;
  }
}

export default function BidForm({ jobId }: { jobId: string }) {
  const [form, setForm] = useState({
    bidAmount: "",
    message: "",
    proposedStartDate: "",
    proposedDurationDays: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [scriptSrc, setScriptSrc] = useState<string | null>(null);
  const [pendingUuid, setPendingUuid] = useState<string | null>(null);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.bidAmount) { setError("Bid amount is required."); return; }
    setSaving(true);
    setError("");

    const result = await initiateBidPayment({ jobId, ...form });
    setSaving(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    const { uuid, sandbox } = result as { uuid: string; sandbox: boolean };
    const src = sandbox
      ? "https://sandbox.payfast.co.za/onsite/engine.js"
      : "https://www.payfast.co.za/onsite/engine.js";

    // If script already loaded, open popup immediately
    if (window.payfast_do_onsite_payment) {
      openPopup(uuid);
    } else {
      setScriptSrc(src);
      setPendingUuid(uuid);
    }
  }

  function openPopup(uuid: string) {
    window.payfast_do_onsite_payment({ uuid }, (result) => {
      if (result.payment_status === "COMPLETE") {
        setSuccess(true);
      } else {
        setError("Payment was cancelled. Your bid was not submitted.");
      }
      setPendingUuid(null);
    });
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-green-800 mb-1">Bid submitted!</h3>
        <p className="text-sm text-green-700">Payment confirmed. The client will review your bid and get back to you.</p>
      </div>
    );
  }

  return (
    <>
      {scriptSrc && (
        <Script
          src={scriptSrc}
          onLoad={() => {
            if (pendingUuid) openPopup(pendingUuid);
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Your Bid Amount (ZAR) <span className="text-red-500">*</span></label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">R</span>
            <input
              type="number"
              value={form.bidAmount}
              onChange={(e) => set("bidAmount", e.target.value)}
              placeholder="0"
              min="1"
              className={`${inputClass} pl-7`}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Cover Letter / Message</label>
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            rows={4}
            placeholder="Describe your experience, approach to this job, and why the client should choose you…"
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Proposed Start Date</label>
            <input
              type="date"
              value={form.proposedStartDate}
              onChange={(e) => set("proposedStartDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Estimated Duration (days)</label>
            <input
              type="number"
              value={form.proposedDurationDays}
              onChange={(e) => set("proposedDurationDays", e.target.value)}
              placeholder="e.g. 7"
              min="1"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 transition-colors"
        >
          {saving ? "Preparing payment…" : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              Submit Bid — R200 fee
            </>
          )}
        </button>
        <p className="text-xs text-gray-400 text-center">A once-off R200 bid fee is required to submit your bid.</p>
      </form>
    </>
  );
}
