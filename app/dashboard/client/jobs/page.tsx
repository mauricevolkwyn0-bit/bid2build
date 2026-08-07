import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft:     { label: "Draft",      className: "bg-gray-100 text-gray-600"    },
  open:      { label: "Open",       className: "bg-blue-100 text-blue-700"    },
  awarded:   { label: "Awarded",    className: "bg-orange-100 text-orange-700"},
  completed: { label: "Completed",  className: "bg-green-100 text-green-700"  },
  cancelled: { label: "Cancelled",  className: "bg-red-100 text-red-700"      },
};

function formatBudget(min?: number | null, max?: number | null) {
  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Not specified";
}

export default async function MyJobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "client") redirect("/dashboard/contractor");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, status, budget_min, budget_max, city, province, date_posted, created_at")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  // Get bid counts per job
  const jobIds = jobs?.map((j: { id: string }) => j.id) ?? [];
  const { data: bidCounts } = jobIds.length > 0
    ? await supabase
        .from("bids")
        .select("job_id")
        .in("job_id", jobIds)
    : { data: [] };

  const bidCountMap: Record<string, number> = {};
  bidCounts?.forEach((b: { job_id: string }) => {
    bidCountMap[b.job_id] = (bidCountMap[b.job_id] ?? 0) + 1;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-500 mt-1">Manage all the jobs you&apos;ve posted</p>
        </div>
        <Link
          href="/dashboard/client/post-job"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Post a Job
        </Link>
      </div>

      {jobs && jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job: {
            id: string;
            title: string;
            status: string;
            budget_min: number | null;
            budget_max: number | null;
            city: string | null;
            province: string | null;
            date_posted: string | null;
            created_at: string;
          }) => {
            const status = statusConfig[job.status] ?? { label: job.status, className: "bg-gray-100 text-gray-600" };
            const bids = bidCountMap[job.id] ?? 0;
            const location = [job.city, job.province].filter(Boolean).join(", ") || "—";
            const posted = new Date(job.date_posted ?? job.created_at).toLocaleDateString("en-ZA", {
              day: "numeric", month: "short", year: "numeric",
            });
            return (
              <div key={job.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}>
                        {status.label}
                      </span>
                      <span className="text-xs text-gray-400">Posted {posted}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{job.title}</h3>
                    <div className="flex items-center gap-5 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatBudget(job.budget_min, job.budget_max)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {bids} bid{bids !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                    <Link
                      href={`/dashboard/client/jobs/${job.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600"
                    >
                      View bids
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-medium mb-1">No jobs posted yet</h3>
            <p className="text-sm text-gray-500 mb-6">Post your first job to start receiving bids from contractors</p>
            <Link
              href="/dashboard/client/post-job"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Post your first job
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
