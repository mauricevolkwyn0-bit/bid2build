import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending:  { label: "Pending",  className: "bg-yellow-100 text-yellow-700" },
  accepted: { label: "Accepted", className: "bg-green-100 text-green-700"  },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700"     },
  withdrawn:{ label: "Withdrawn",className: "bg-gray-100 text-gray-600"   },
};

export default async function MyBidsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "contractor") redirect("/dashboard/client");

  const { data: bids } = await supabase
    .from("bids")
    .select("id, bid_amount, status, created_at, jobs(title, city, province)")
    .eq("contractor_id", user.id)
    .order("created_at", { ascending: false });

  const counts = {
    all:      bids?.length ?? 0,
    pending:  bids?.filter((b: { status: string }) => b.status === "pending").length ?? 0,
    accepted: bids?.filter((b: { status: string }) => b.status === "accepted").length ?? 0,
    rejected: bids?.filter((b: { status: string }) => b.status === "rejected").length ?? 0,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
        <p className="text-gray-500 mt-1">Track the status of bids you&apos;ve submitted</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Bids",  value: counts.all,      color: "text-gray-900" },
          { label: "Pending",     value: counts.pending,  color: "text-yellow-600" },
          { label: "Accepted",    value: counts.accepted, color: "text-green-600" },
          { label: "Rejected",    value: counts.rejected, color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bids list */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Bids</h2>
        </div>

        {bids && bids.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {bids.map((bid: {
              id: string;
              bid_amount: number;
              status: string;
              created_at: string;
              jobs: { title: string; city: string | null; province: string | null } | null;
            }) => {
              const status = statusConfig[bid.status] ?? { label: bid.status, className: "bg-gray-100 text-gray-600" };
              const location = bid.jobs?.city ?? bid.jobs?.province ?? "—";
              return (
                <div key={bid.id} className="flex items-center justify-between gap-4 p-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {bid.jobs?.title ?? "Job removed"}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {location}
                      </span>
                      <span>Submitted {new Date(bid.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-gray-900">R{bid.bid_amount.toLocaleString("en-ZA")}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Your bid</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-medium mb-1">No bids submitted yet</h3>
            <p className="text-sm text-gray-500 mb-6">Browse available jobs and submit your first bid</p>
            <a
              href="/dashboard/contractor/jobs"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Browse Jobs
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
