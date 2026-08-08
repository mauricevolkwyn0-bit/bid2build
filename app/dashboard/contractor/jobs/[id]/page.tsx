import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import BidForm from "./BidForm";

function formatBudget(min?: number | null, max?: number | null) {
  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Not specified";
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "contractor") redirect("/dashboard/client");

  const { data: job } = await supabase
    .from("jobs")
    .select(`
      id, title, description, status,
      budget_min, budget_max, timeframe_days, desired_start_date,
      location_address, city, province,
      date_posted, image_urls,
      job_categories(name)
    `)
    .eq("id", id)
    .eq("status", "open")
    .single();

  if (!job) notFound();

  // Bid count and whether this contractor already bid
  const [{ count: bidCount }, { data: myBid }] = await Promise.all([
    supabase.from("bids").select("id", { count: "exact", head: true }).eq("job_id", id),
    supabase.from("bids").select("id, bid_amount, message, status, created_at").eq("job_id", id).eq("contractor_id", user.id).single(),
  ]);

  const category = Array.isArray(job.job_categories)
    ? job.job_categories[0]?.name
    : (job.job_categories as { name: string } | null)?.name;

  // Generate signed URLs so images work regardless of bucket visibility
  const rawImageUrls = (job.image_urls ?? []) as string[];
  const signedImageUrls = await Promise.all(
    rawImageUrls.map(async (url) => {
      const path = url.split("/job-images/")[1];
      if (!path) return url;
      const { data } = await supabase.storage.from("job-images").createSignedUrl(path, 60 * 60);
      return data?.signedUrl ?? url;
    })
  );

  return (
    <div className="p-8 max-w-4xl">
      {/* Back */}
      <Link
        href="/dashboard/contractor/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Job header */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {category && (
                <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                  {category}
                </span>
              )}
              <span className="text-xs text-gray-400">
                {job.date_posted
                  ? new Date(job.date_posted).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })
                  : ""}
              </span>
              <span className="text-xs text-gray-400">· {bidCount ?? 0} bid{bidCount !== 1 ? "s" : ""} received</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Budget</p>
                <p className="text-sm font-semibold text-gray-900">{formatBudget(job.budget_min, job.budget_max)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Location</p>
                <p className="text-sm font-semibold text-gray-900">{[job.city, job.province].filter(Boolean).join(", ") || "—"}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Start Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {job.desired_start_date
                    ? new Date(job.desired_start_date).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })
                    : "Flexible"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-sm font-semibold text-gray-900">
                  {job.timeframe_days ? `${job.timeframe_days} days` : "Flexible"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Job Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {/* Images */}
          {signedImageUrls.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {signedImageUrls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Job photo ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">Location</h2>
            <p className="text-sm text-gray-600">{job.location_address}</p>
            {(job.city || job.province) && (
              <p className="text-sm text-gray-400 mt-1">{[job.city, job.province].filter(Boolean).join(", ")}</p>
            )}
          </div>
        </div>

        {/* Sidebar — bid form or existing bid */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {myBid ? (
              <>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Your Bid</h2>
                <div className="flex flex-col gap-3">
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-orange-600 font-medium mb-1">Bid Amount</p>
                    <p className="text-2xl font-bold text-orange-600">R{myBid.bid_amount.toLocaleString("en-ZA")}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      myBid.status === "accepted" ? "bg-green-100 text-green-700" :
                      myBid.status === "rejected" ? "bg-red-100 text-red-700" :
                      myBid.status === "awarded"  ? "bg-orange-100 text-orange-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {myBid.status.charAt(0).toUpperCase() + myBid.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Submitted</span>
                    <span className="text-gray-700">
                      {new Date(myBid.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  {myBid.message && (
                    <div className="bg-gray-50 rounded-xl p-3 mt-1">
                      <p className="text-xs text-gray-400 mb-1">Your message</p>
                      <p className="text-sm text-gray-600 line-clamp-4">{myBid.message}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Submit a Bid</h2>
                <BidForm jobId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
