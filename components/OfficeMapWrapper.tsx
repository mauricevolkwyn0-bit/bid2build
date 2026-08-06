"use client";

import dynamic from "next/dynamic";

const OfficeMap = dynamic(() => import("@/components/OfficeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-gray-100 animate-pulse" />
  ),
});

export default function OfficeMapWrapper() {
  return <OfficeMap />;
}
