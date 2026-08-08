import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AwardBidButton from "./AwardBidButton";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft:     { label: "Draft",      className: "bg-gray-100 text-gray-600"    },
  open:      { label: "Open",       className: "bg-blue-100 text-blue-700"    },
  awarded:   { label: "Awarded",    className: "bg-orange-100 text-orange-700"},
  completed: { label: "Completed",  className: "bg-green-100 text-green-700"  },
  cancelled: { label: "Cancelled",  className: "bg-red-100 text-red-700"      },
};

const bidStatusConfig: Record<string, { label: string; className: string }> = {
  pending:  { label: "Pending",  className: "bg-yellow-100 text-yellow-700" },
  awarded:  { label: "Awarded",  className: "bg-orange-100 text-orange-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700"       },
  accepted: { label: "Accepted", className: "bg-green-100 text-green-700"   },
};

function formatBudget(min?: number | null, max?: number | null) {
  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Not specified";
}

export default async function ClientJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "client") redirect("/dashboard/contractor");

  const { data: job } = await supabase
    .from("jobs")
    .select(`
      id, title, description, status,
      budget_min, budget_max, timeframe_days, desired_start_date,
      location_address, city, province,
      date_posted, created_at, image_urls,
      job_categories(name)
    `)
    .eq("id", id)
    .eq("client_id", user.id)
    .single();

  if (!job) notFound();

  const { data: bids } = await supabase
    .from("bids")
    .select("id, bid_amount, message, proposed_start_date, proposed_duration_days, status, created_at, contractor_id")
    .eq("job_id", id)
    .order("bid_amount", { ascending: true });

  const contractorIds = [...new Set((bids ?? []).map((b) => b.contractor_id as string))];
  const { data: profiles } = contractorIds.length > 0
    ? await supabase
        .from("contractor_profiles")
        .select("user_id, first_name, last_name, company_name, entity_type")
        .in("user_id", contractorIds)
    : { data: [] };

  const profileMap: Record<string, { first_name: string | null; last_name: string | null; company_name: string | null }> =
    Object.fromEntries((profiles ?? []).map((p) => [p.user_id, p]));

  const category = Array.isArray(job.job_categories)
    ? job.job_categories[0]?.name
    : (job.job_categories as { name: string } | null)?.name;

  const rawImageUrls = (job.image_urls ?? []) as string[];
  const signedImageUrls = await Promise.all(
    rawImageUrls.map(async (url) => {
      const path = url.split("/job-images/")[1];
      if (!path) return url;
      const { data } = await supabase.storage.from("job-images").createSignedUrl(path, 60 * 60);
      return data?.signedUrl ?? url;
    })
  );

  const jobStatus = statusConfig[job.status] ?? { label: job.status, className: "bg-gray-100 text-gray-600" };

  return (
    <div className="p-8 max-w-5xl">
      <Link
        href="/dashboard/client/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to My Jobs
      </Link>

      {/* Job header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${jobStatus.className}`}>
            {jobStatus.label}
          </span>
          {category && (
            <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
              {category}
            </span>
          )}
          <span className="text-xs text-gray-400">
            Posted {new Date(job.date_posted ?? job.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
          </span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Description + photos + location */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

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

          {job.location_address && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Location</h2>
              <p className="text-sm text-gray-600">{job.location_address}</p>
              {(job.city || job.province) && (
                <p className="text-sm text-gray-400 mt-1">{[job.city, job.province].filter(Boolean).join(", ")}</p>
              )}
            </div>
          )}
        </div>

        {/* Bids summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-4xl font-bold text-orange-500 mb-1">{bids?.length ?? 0}</p>
            <p className="text-sm text-gray-500">Bid{(bids?.length ?? 0) !== 1 ? "s" : ""} received</p>
          </div>
        </div>
      </div>

      {/* Bids list */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Bids ({bids?.length ?? 0})
        </h2>

        {bids && bids.length > 0 ? (
          <div className="flex flex-col gap-4">
            {bids.map((bid) => {
              const profile = profileMap[bid.contractor_id as string];
              const fullName = profile
                ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "Contractor"
                : "Contractor";
              const displayName = profile?.company_name ? `${profile.company_name} · ${fullName}` : fullName;
              const bs = bidStatusConfig[bid.status as string] ?? { label: bid.status, className: "bg-gray-100 text-gray-600" };

              return (
                <div key={bid.id as string} className="border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${bs.className}`}>
                          {bs.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(bid.created_at as string).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">{displayName}</p>
                      {bid.message && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{bid.message as string}</p>
                      )}
                      <div className="flex gap-4 mt-3 text-xs text-gray-500 flex-wrap">
                        {bid.proposed_start_date && (
                          <span>Start: {new Date(bid.proposed_start_date as string).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</span>
                        )}
                        {bid.proposed_duration_days && (
                          <span>Duration: {bid.proposed_duration_days as number} days</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-3">
                      <p className="text-2xl font-bold text-gray-900">R{(bid.bid_amount as number).toLocaleString("en-ZA")}</p>
                      {job.status === "open" && bid.status === "pending" && (
                        <AwardBidButton bidId={bid.id as string} jobId={job.id} />
                      )}
                      {bid.status === "awarded" && (
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                          Awarded ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">No bids yet</p>
            <p className="text-xs text-gray-400 mt-1">Contractors will submit their bids here once they find your job</p>
          </div>
        )}
      </div>
    </div>
  );
}
