import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

function formatBudget(min?: number | null, max?: number | null) {
  if (!min && !max) return "Budget not specified";
  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default async function BrowseJobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "contractor") redirect("/dashboard/client");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, description, budget_min, budget_max, location_address, city, province, created_at, job_categories(name)")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
          <p className="text-gray-500 mt-1">Find projects that match your skills</p>
        </div>
        {jobs && jobs.length > 0 && (
          <span className="text-sm text-gray-500">{jobs.length} job{jobs.length !== 1 ? "s" : ""} available</span>
        )}
      </div>

      {/* Search & filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title or keyword…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-600">
          <option value="">All Locations</option>
          <option>Pretoria</option>
          <option>Johannesburg</option>
          <option>Cape Town</option>
          <option>Durban</option>
        </select>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-600">
          <option value="">Any Budget</option>
          <option>Under R10,000</option>
          <option>R10,000 – R50,000</option>
          <option>R50,000 – R200,000</option>
          <option>Over R200,000</option>
        </select>
      </div>

      {/* Job listings */}
      {jobs && jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job: {
            id: string;
            title: string;
            description: string;
            budget_min: number | null;
            budget_max: number | null;
            location_address: string;
            city: string | null;
            province: string | null;
            created_at: string;
            job_categories: { name: string } | null;
          }) => (
            <div key={job.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {job.job_categories && (
                      <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                        {(job.job_categories as { name: string }).name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{timeAgo(job.created_at)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{job.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {job.city ?? job.province ?? job.location_address}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatBudget(job.budget_min, job.budget_max)}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/contractor/jobs/${job.id}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
                >
                  View & Bid
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-medium mb-1">No jobs available yet</h3>
            <p className="text-sm text-gray-500">New jobs from clients will appear here. Check back soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
