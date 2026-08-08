"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { awardBid } from "@/app/actions/client";

export default function AwardBidButton({ bidId, jobId }: { bidId: string; jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAward() {
    if (!confirm("Award this bid? All other bids will be rejected and the job will be marked as awarded.")) return;
    setLoading(true);
    const result = await awardBid(bidId, jobId);
    setLoading(false);
    if ("error" in result && result.error) {
      setError(result.error);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {error && <p className="text-xs text-red-500 text-right">{error}</p>}
      <button
        onClick={handleAward}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-4 py-2 rounded-full transition-colors"
      >
        {loading ? "Awarding…" : "Award Bid"}
      </button>
    </div>
  );
}
