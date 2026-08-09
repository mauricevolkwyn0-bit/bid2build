"use client";

import { useState } from "react";
import { setSiteActive } from "@/app/actions/site";
import { useRouter } from "next/navigation";

export default function ActivateButton({ isActive }: { isActive: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    setError("");
    const result = await setSiteActive(!isActive);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (!isActive) {
      router.push("/");
      router.refresh();
    } else {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`inline-flex items-center gap-2.5 px-8 py-3 rounded-full font-semibold text-white text-sm transition-all disabled:opacity-60 shadow-sm ${
          isActive
            ? "bg-red-500 hover:bg-red-600 shadow-red-200"
            : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
        }`}
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Updating…
          </>
        ) : isActive ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Deactivate Site
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 12.728M12 3v9" />
            </svg>
            Activate Site
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
