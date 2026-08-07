"use client";

import { useState } from "react";

const clientVideos = [
  { step: "01", title: "Register as a Client", videoId: "YOUR_VIDEO_ID" },
  { step: "02", title: "Post a Job", videoId: "YOUR_VIDEO_ID" },
  { step: "03", title: "Receive Submitted Bids", videoId: "YOUR_VIDEO_ID" },
  { step: "04", title: "Job Gets Done", videoId: "YOUR_VIDEO_ID" },
];

const contractorVideos = [
  { step: "01", title: "Register as a Contractor", videoId: "YOUR_VIDEO_ID" },
  { step: "02", title: "Get Notified of Jobs", videoId: "YOUR_VIDEO_ID" },
  { step: "03", title: "Submit a Bid", videoId: "YOUR_VIDEO_ID" },
  { step: "04", title: "Get Appointed", videoId: "YOUR_VIDEO_ID" },
];

export default function HowItWorksVideos() {
  const [activeRole, setActiveRole] = useState<"client" | "contractor">("client");
  const videos = activeRole === "client" ? clientVideos : contractorVideos;

  return (
    <section className="bg-white py-10 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setActiveRole("client")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeRole === "client"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setActiveRole("contractor")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeRole === "contractor"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contractor
            </button>
          </div>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {videos.map((item) => (
            <div key={item.step} className="flex flex-col gap-3">
              {/* Video embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Step label */}
              <div className="flex items-center gap-3 px-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">
                  {item.step}
                </span>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
