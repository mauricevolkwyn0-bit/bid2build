import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const bidStatusConfig: Record<string, { label: string; className: string }> = {
  pending:  { label: "Pending",  className: "bg-yellow-100 text-yellow-700" },
  accepted: { label: "Accepted", className: "bg-green-100 text-green-700"   },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700"       },
  awarded:  { label: "Awarded",  className: "bg-orange-100 text-orange-700" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

function formatBudget(min?: number | null, max?: number | null) {
  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Budget not specified";
}

export default async function ContractorDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "contractor") redirect("/dashboard/client");

  const firstName = user.user_metadata?.first_name ?? "there";

  // Run queries in parallel
  const [
    { count: jobsAvailable },
    { data: myBids },
    { data: latestJobs },
  ] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "open"),
    supabase
      .from("bids")
      .select("id, bid_amount, status, created_at, jobs(id, title, city, province)")
      .eq("contractor_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("jobs")
      .select("id, title, budget_min, budget_max, city, province, created_at, job_categories(name)")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const bidsSubmitted = myBids?.length ?? 0;
  const inProgress    = myBids?.filter((b) => b.status === "awarded").length ?? 0;
  const completed     = myBids?.filter((b) => b.status === "accepted").length ?? 0;
  const recentBids    = myBids?.slice(0, 5) ?? [];

  const stats = [
    {
      label: "Jobs Available", value: jobsAvailable ?? 0,
      bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: "Bids Submitted", value: bidsSubmitted,
      bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "In Progress", value: inProgress,
      bg: "bg-yellow-50", iconBg: "bg-yellow-100", iconColor: "text-yellow-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      label: "Completed", value: completed,
      bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
        <p className="text-gray-500 mt-1">Find jobs and manage your bids from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-6`}>
            <div className={`${stat.iconBg} ${stat.iconColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-orange-500 rounded-2xl p-6 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-1">Browse Jobs</h3>
          <p className="text-sm text-orange-100 mb-4">Find new projects that match your skills</p>
          <Link
            href="/dashboard/contractor/jobs"
            className="inline-flex items-center gap-2 bg-white text-orange-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-50 transition-colors"
          >
            View jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">My Bids</h3>
          <p className="text-sm text-gray-500 mb-4">Track the status of your submitted bids</p>
          <Link
            href="/dashboard/contractor/bids"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View bids
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">My Profile</h3>
          <p className="text-sm text-gray-500 mb-4">Manage your skills, certifications and details</p>
          <Link
            href="/dashboard/contractor/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Edit profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest available jobs */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Latest Jobs</h2>
            <Link href="/dashboard/contractor/jobs" className="text-sm text-orange-500 font-medium hover:text-orange-600">
              View all
            </Link>
          </div>

          {latestJobs && latestJobs.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {latestJobs.map((job: {
                id: string;
                title: string;
                budget_min: number | null;
                budget_max: number | null;
                city: string | null;
                province: string | null;
                created_at: string;
                job_categories: { name: string }[] | { name: string } | null;
              }) => {
                const category = Array.isArray(job.job_categories)
                  ? job.job_categories[0]?.name
                  : (job.job_categories as { name: string } | null)?.name;
                return (
                  <div key={job.id} className="flex items-center justify-between py-4 gap-4">
                    <div className="flex-1 min-w-0">
                      {category && (
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-medium">
                          {category}
                        </span>
                      )}
                      <p className="text-sm font-semibold text-gray-900 truncate mt-1">{job.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {[job.city, job.province].filter(Boolean).join(", ") || "—"} · {formatBudget(job.budget_min, job.budget_max)} · {timeAgo(job.created_at)}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/contractor/jobs/${job.id}`}
                      className="flex-shrink-0 text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                    >
                      View & Bid
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-gray-500">No open jobs available yet. Check back soon.</p>
            </div>
          )}
        </div>

        {/* Recent bids */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bids</h2>
            <Link href="/dashboard/contractor/bids" className="text-sm text-orange-500 font-medium hover:text-orange-600">
              View all
            </Link>
          </div>

          {recentBids.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {recentBids.map((bid) => {
                const job = Array.isArray(bid.jobs) ? bid.jobs[0] : null;
                const status = bidStatusConfig[bid.status] ?? { label: bid.status, className: "bg-gray-100 text-gray-600" };
                return (
                  <div key={bid.id} className="flex items-center justify-between py-4 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}>
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-400">{timeAgo(bid.created_at)}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 truncate">{job?.title ?? "—"}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Bid: R{bid.bid_amount.toLocaleString("en-ZA")}
                      </p>
                    </div>
                    {job?.id && (
                      <Link
                        href={`/dashboard/contractor/jobs/${job.id}`}
                        className="flex-shrink-0 text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                      >
                        View
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-gray-500 mb-4">No bids submitted yet</p>
              <Link
                href="/dashboard/contractor/jobs"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Browse available jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
